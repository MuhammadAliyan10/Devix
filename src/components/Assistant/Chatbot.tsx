import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  RotateCcw,
  Edit2,
  Trash2,
  Check,
  X,
  Copy,
  Download,
  Search,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  AlertCircle,
  Wifi,
  WifiOff,
  Clock,
  MessageSquare,
} from "lucide-react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

// Enhanced TypeScript interfaces
interface BaseMessage {
  id: string;
  content: string;
  timestamp: string | Date;
  context?: string;
}

interface UserMessage extends BaseMessage {
  sender: "user";
  queryId?: string;
  editHistory?: string[];
  reactions?: MessageReaction[];
}

interface AssistantMessage extends BaseMessage {
  sender: "assistant";
  queryId?: string;
  isTyping?: boolean;
  displayedContent?: string;
  tokens?: number;
  processingTime?: number;
  model?: string;
  confidence?: number;
  sources?: MessageSource[];
  reactions?: MessageReaction[];
}

type Message = UserMessage | AssistantMessage;

interface MessageReaction {
  type: "like" | "dislike" | "helpful" | "unhelpful";
  timestamp: string;
}

interface MessageSource {
  title: string;
  url: string;
  snippet: string;
}

interface ChatBotProps {
  title?: string;
  placeholder?: string;
  apiEndpoint?: string;
  defaultOpen?: boolean;
  context?: string;
  systemPrompt?: string;
  userId: string;
  className?: string;
  theme?: "light" | "dark" | "auto";
  maxMessages?: number;
  enableVoice?: boolean;
  enableExport?: boolean;
  enableSearch?: boolean;
  enableReactions?: boolean;
  customActions?: CustomAction[];
  onMessageSent?: (message: string) => void;
  onMessageReceived?: (message: Message) => void;
  onError?: (error: Error) => void;
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

interface CustomAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: (message: Message) => void;
}

interface ChatHistoryResponse {
  history: Message[];
  totalCount?: number;
  hasMore?: boolean;
}

interface SendMessageResponse {
  response: string;
  query_id?: string;
  context?: string;
  user_id?: string;
  error?: string;
  metadata?: {
    tokens?: number;
    processingTime?: number;
    model?: string;
    confidence?: number;
    sources?: MessageSource[];
  };
}

interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

interface ChatBotRef {
  sendMessage: (message: string) => void;
  clearChat: () => void;
  exportChat: () => void;
  focusInput: () => void;
}

// Custom hooks
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

const useRateLimit = (maxRequests: number, windowMs: number) => {
  const [requests, setRequests] = useState<number[]>([]);

  const isRateLimited = useCallback(() => {
    const now = Date.now();
    const validRequests = requests.filter((time) => now - time < windowMs);
    return validRequests.length >= maxRequests;
  }, [requests, maxRequests, windowMs]);

  const addRequest = useCallback(() => {
    const now = Date.now();
    setRequests((prev) => [
      ...prev.filter((time) => now - time < windowMs),
      now,
    ]);
  }, [windowMs]);

  return { isRateLimited, addRequest };
};

const useTypingAnimation = (messages: Message[]) => {
  useEffect(() => {
    const typingMessages = messages.filter(
      (msg): msg is AssistantMessage =>
        msg.sender === "assistant" &&
        msg.displayedContent !== undefined &&
        msg.displayedContent !== msg.content
    );

    if (typingMessages.length === 0) return;

    const timers: NodeJS.Timeout[] = [];

    typingMessages.forEach((msg) => {
      let index = msg.displayedContent?.length || 0;
      const typeSpeed = msg.content.length > 200 ? 15 : 30; // Faster for longer messages

      const updateMessage = () => {
        const nextIndex = index + 1;
        // Update the message state (this would need to be passed down from parent)
        index = nextIndex;

        if (index < msg.content.length) {
          timers.push(setTimeout(updateMessage, typeSpeed));
        }
      };

      if (index < msg.content.length) {
        timers.push(setTimeout(updateMessage, typeSpeed));
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [messages]);
};

// Enhanced API functions with better error handling
const createApiError = (response: Response, data): ApiError => ({
  message: data?.error || `HTTP ${response.status}: ${response.statusText}`,
  code: data?.code || response.status.toString(),
  details: data,
});

const fetchChatHistory = async ({
  userId,
  context,
  pageParam = 0,
}: {
  userId: string;
  context: string;
  pageParam: number;
}): Promise<Message[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/history/${encodeURIComponent(
        userId
      )}/${encodeURIComponent(context)}?limit=20&offset=${pageParam}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw createApiError(response, errorData);
    }

    const data = (await response.json()) as ChatHistoryResponse;

    // Validate response structure
    if (!Array.isArray(data.history)) {
      throw new Error("Invalid response format: history must be an array");
    }

    return data.history;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout - please check your connection");
      }
      throw error;
    }
    throw new Error("Unknown error occurred while fetching chat history");
  }
};

const sendMessage = async ({
  userId,
  message,
  context,
  systemPrompt,
  history,
}: {
  userId: string;
  message: string;
  context: string;
  systemPrompt: string;
  history: Message[];
}): Promise<SendMessageResponse> => {
  try {
    // Input validation
    if (!message.trim()) {
      throw new Error("Message cannot be empty");
    }

    if (message.length > 4000) {
      throw new Error(
        "Message too long. Please keep it under 4000 characters."
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for message sending

    const sanitizedHistory = history
      .slice(-10) // Increased context window
      .map(({ content, sender, timestamp }) => ({
        content: content.trim(),
        sender,
        timestamp,
      }));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          context: context.trim(),
          user_id: userId,
          systemPrompt: systemPrompt.trim(),
          history: sanitizedHistory,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    const data = (await response.json()) as SendMessageResponse;

    if (!response.ok || data.error) {
      throw createApiError(response, data);
    }

    // Validate response
    if (!data.response) {
      throw new Error("Invalid response: missing response content");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          "Request timeout - the server took too long to respond"
        );
      }
      throw error;
    }
    throw new Error("Unknown error occurred while sending message");
  }
};

const updateMessage = async ({
  queryId,
  content,
}: {
  queryId: string;
  content: string;
}): Promise<void> => {
  try {
    if (!content.trim()) {
      throw new Error("Message content cannot be empty");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/message/${encodeURIComponent(
        queryId
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ content: content.trim() }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw createApiError(response, errorData);
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unknown error occurred while updating message");
  }
};

const deleteMessage = async ({
  queryId,
}: {
  queryId: string;
}): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/message/${encodeURIComponent(
        queryId
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw createApiError(response, errorData);
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unknown error occurred while deleting message");
  }
};

// Enhanced components
const TypingIndicator = memo(() => (
  <div className="flex items-center gap-2 px-4 py-3">
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
    </div>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      AI is thinking...
    </span>
  </div>
));

TypingIndicator.displayName = "TypingIndicator";

const MessageActions = memo(
  ({
    message,
    onEdit,
    onDelete,
    onCopy,
    onReact,
    customActions = [],
  }: {
    message: Message;
    onEdit?: () => void;
    onDelete?: () => void;
    onCopy?: () => void;
    onReact?: (reaction: MessageReaction["type"]) => void;
    customActions?: CustomAction[];
  }) => {
    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(message.content);
        toast.success("Message copied to clipboard");
        onCopy?.();
      } catch (error) {
        toast.error("Failed to copy message");
        console.log(error);
      }
    }, [message.content, onCopy]);

    return (
      <div className="absolute top-0 right-0 hidden group-hover:flex gap-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1">
        <button
          onClick={handleCopy}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
          title="Copy message"
          aria-label="Copy message"
        >
          <Copy className="w-3 h-3" />
        </button>

        {onReact && (
          <>
            <button
              onClick={() => onReact("like")}
              className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors"
              title="Like message"
              aria-label="Like message"
            >
              👍
            </button>
            <button
              onClick={() => onReact("dislike")}
              className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
              title="Dislike message"
              aria-label="Dislike message"
            >
              👎
            </button>
          </>
        )}

        {message.sender === "user" && onEdit && (
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
            title="Edit message"
            aria-label="Edit message"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        )}

        {message.sender === "user" && message.queryId && onDelete && (
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
            title="Delete message"
            aria-label="Delete message"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}

        {customActions.map((action) => (
          <button
            key={action.id}
            onClick={() => action.action(message)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
            title={action.label}
            aria-label={action.label}
          >
            <action.icon className="w-3 h-3" />
          </button>
        ))}
      </div>
    );
  }
);

MessageActions.displayName = "MessageActions";

const MessageBubble = memo(
  ({
    message,
    onEdit,
    onDelete,
    onReact,
    customActions,
    isEditing,
    editContent,
    onEditContentChange,
    onSaveEdit,
    onCancelEdit,
  }: {
    message: Message;
    onEdit?: () => void;
    onDelete?: () => void;
    onReact?: (reaction: MessageReaction["type"]) => void;
    customActions?: CustomAction[];
    isEditing?: boolean;
    editContent?: string;
    onEditContentChange?: (content: string) => void;
    onSaveEdit?: () => void;
    onCancelEdit?: () => void;
  }) => {
    const formatTime = useCallback((date: string | Date) => {
      const d = new Date(date);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;

      return d.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }, []);

    const displayContent =
      message.sender === "assistant"
        ? (message as AssistantMessage).displayedContent || message.content
        : message.content;

    const metadata =
      message.sender === "assistant" ? (message as AssistantMessage) : null;

    return (
      <div
        className={`flex mb-6 ${
          message.sender === "user" ? "justify-end" : "justify-start"
        } group`}
        role="article"
        aria-label={`Message from ${message.sender}`}
      >
        <div
          className={`flex max-w-[85%] ${
            message.sender === "user" ? "flex-row-reverse" : "flex-row"
          } items-end gap-3`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === "user"
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg"
                : "bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-500 dark:to-gray-600 shadow-lg"
            }`}
          >
            {message.sender === "user" ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>

          <div
            className={`${message.sender === "user" ? "mr-2" : "ml-2"} flex-1`}
          >
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={editContent}
                  onChange={(e) => onEditContentChange?.(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-white resize-none"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={onSaveEdit}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={onCancelEdit}
                    className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-full text-sm flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm relative ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                } ${
                  (message as AssistantMessage).isTyping
                    ? "min-h-[60px] flex items-center"
                    : ""
                }`}
              >
                {(message as AssistantMessage).isTyping ? (
                  <TypingIndicator />
                ) : (
                  <div className="relative">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">
                        {displayContent}
                      </p>
                    </div>

                    {metadata?.sources && metadata.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Sources:
                        </p>
                        {metadata.sources.map((source, index) => (
                          <a
                            key={index}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-blue-600 dark:text-blue-400 hover:underline mb-1"
                          >
                            {source.title}
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <p
                        className={`text-xs ${
                          message.sender === "user"
                            ? "text-indigo-100 dark:text-indigo-200"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                        {metadata?.processingTime && (
                          <span className="ml-2">
                            • {metadata.processingTime}ms
                          </span>
                        )}
                        {metadata?.tokens && (
                          <span className="ml-2">
                            • {metadata.tokens} tokens
                          </span>
                        )}
                      </p>

                      {metadata?.confidence && (
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            metadata.confidence > 0.8
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : metadata.confidence > 0.6
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {Math.round(metadata.confidence * 100)}% confident
                        </div>
                      )}
                    </div>

                    <MessageActions
                      message={message}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onReact={onReact}
                      customActions={customActions}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = "MessageBubble";

const ChatBotAssistant = forwardRef<ChatBotRef, ChatBotProps>(
  (
    {
      title,
      placeholder,
      // apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
      defaultOpen = false,
      context,
      systemPrompt = "You are a helpful AI assistant specialized in education, providing concise, personalized responses based on user data and context.",
      userId,
      className = "",
      maxMessages = 100,
      enableVoice = false,
      enableExport = true,
      enableSearch = true,
      enableReactions = true,
      customActions = [],
      onMessageSent,
      onMessageReceived,
      onError,
      rateLimit = { maxRequests: 60, windowMs: 60000 }, // 60 requests per minute
    },
    ref
  ) => {
    // State management
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [editingMessage, setEditingMessage] = useState<{
      id: string;
      content: string;
    } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(defaultOpen);
    const [voiceEnabled, setVoiceEnabled] = useState(false);

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    // Custom hooks
    const isOnline = useOnlineStatus();
    const { isRateLimited, addRequest } = useRateLimit(
      rateLimit.maxRequests,
      rateLimit.windowMs
    );

    // Memoized values
    const filteredMessages = useMemo(() => {
      if (!searchQuery.trim()) return messages;
      return messages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [messages, searchQuery]);

    // Scroll management
    const scrollToBottom = useCallback(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    // const scrollToTop = useCallback(() => {
    //   messagesContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    // }, []);

    // Effects
    useEffect(() => {
      scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
      if (defaultOpen && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, [defaultOpen]);

    useTypingAnimation(messages);

    // API queries and mutations
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading: isHistoryLoading,
      error: historyError,
    } = useInfiniteQuery<Message[], Error>({
      queryKey: ["chatHistory", userId, context],
      queryFn: ({ pageParam }) =>
        fetchChatHistory({
          userId,
          context: context || "",
          pageParam: pageParam as number,
        }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 20 ? allPages.length * 20 : undefined,
      initialPageParam: 0,
      enabled: !!userId && !!context && isOnline,
      retry: (failureCount, error) => {
        if (error.message.includes("timeout")) return failureCount < 2;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    const allMessages = useMemo(() => {
      const historyMessages = data?.pages.flat() || [];
      const currentMessages = messages.filter(
        (msg) => !(msg as AssistantMessage).isTyping
      );

      // Combine and deduplicate messages
      const combined = [...historyMessages, ...currentMessages];
      const unique = combined.filter(
        (msg, index, arr) => arr.findIndex((m) => m.id === msg.id) === index
      );

      return unique.slice(-maxMessages); // Limit total messages
    }, [data?.pages, messages, maxMessages]);

    // Mutation for sending messages
    const sendMessageMutation = useMutation<
      SendMessageResponse,
      Error,
      {
        userId: string;
        message: string;
        context: string;
        systemPrompt: string;
        history: Message[];
      },
      { userMessage: Message; tempId: string }
    >({
      mutationFn: sendMessage,
      onMutate: async ({ message: messageContent }) => {
        if (isRateLimited()) {
          throw new Error(
            "Too many requests. Please wait a moment before sending another message."
          );
        }

        setIsLoading(true);
        addRequest();

        const tempId = `temp-${Date.now()}`;
        const userMessage: UserMessage = {
          id: tempId,
          content: messageContent,
          sender: "user",
          timestamp: new Date().toISOString(),
          context,
        };

        const typingMessage: AssistantMessage = {
          id: "typing",
          content: "",
          sender: "assistant",
          timestamp: new Date(),
          isTyping: true,
        };

        setMessages((prev) => [...prev, userMessage, typingMessage]);
        setInput("");

        onMessageSent?.(messageContent);

        return { userMessage, tempId };
      },
      onSuccess: (data, variables) => {
        const assistantMessage: AssistantMessage = {
          id: `assistant-${Date.now()}`,
          content: data.response || "Sorry, I couldn't process your request.",
          displayedContent: "",
          sender: "assistant",
          timestamp: new Date().toISOString(),
          queryId: data.query_id,
          context: variables.context,
          tokens: data.metadata?.tokens,
          processingTime: data.metadata?.processingTime,
          model: data.metadata?.model,
          confidence: data.metadata?.confidence,
          sources: data.metadata?.sources,
        };

        setMessages((prev) => {
          const filtered = prev.filter((msg) => msg.id !== "typing");
          return [...filtered, assistantMessage];
        });

        onMessageReceived?.(assistantMessage);
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to send message";
        toast.error(errorMessage);

        setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));
        onError?.(error instanceof Error ? error : new Error(errorMessage));
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });

    // Other mutations
    const updateMessageMutation = useMutation<
      void,
      Error,
      { queryId: string; content: string }
    >({
      mutationFn: updateMessage,
      onSuccess: () => {
        if (editingMessage) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === editingMessage.id
                ? {
                    ...msg,
                    content: editingMessage.content,
                    ...(msg.sender === "assistant" && {
                      displayedContent: editingMessage.content,
                    }),
                  }
                : msg
            )
          );
          setEditingMessage(null);
          toast.success("Message updated successfully");
        }
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to update message";
        toast.error(errorMessage);
        onError?.(error instanceof Error ? error : new Error(errorMessage));
      },
    });

    const deleteMessageMutation = useMutation<void, Error, { queryId: string }>(
      {
        mutationFn: deleteMessage,
        onSuccess: (_, { queryId }) => {
          setMessages((prev) => prev.filter((msg) => msg.queryId !== queryId));
          toast.success("Message deleted successfully");
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to delete message";
          toast.error(errorMessage);
          onError?.(error instanceof Error ? error : new Error(errorMessage));
        },
      }
    );

    // Handler functions
    const handleSendMessage = useCallback(() => {
      const trimmedInput = input.trim();
      if (!trimmedInput || isLoading || !isOnline) return;

      if (trimmedInput.length > 4000) {
        toast.error("Message too long. Please keep it under 4000 characters.");
        return;
      }

      sendMessageMutation.mutate({
        userId,
        message: trimmedInput,
        context,
        systemPrompt,
        history: allMessages,
      });
    }, [
      input,
      isLoading,
      isOnline,
      sendMessageMutation,
      userId,
      context,
      systemPrompt,
      allMessages,
    ]);

    const handleKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      },
      [handleSendMessage]
    );

    const handleEditMessage = useCallback((message: Message) => {
      setEditingMessage({ id: message.id, content: message.content });
    }, []);

    const handleSaveEdit = useCallback(() => {
      if (!editingMessage) return;

      const message = allMessages.find((m) => m.id === editingMessage.id);
      if (message?.queryId) {
        updateMessageMutation.mutate({
          queryId: message.queryId,
          content: editingMessage.content,
        });
      } else {
        // For messages without queryId, just update locally
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === editingMessage.id
              ? { ...msg, content: editingMessage.content }
              : msg
          )
        );
        setEditingMessage(null);
        toast.success("Message updated");
      }
    }, [editingMessage, allMessages, updateMessageMutation]);

    const handleCancelEdit = useCallback(() => {
      setEditingMessage(null);
    }, []);

    const handleDeleteMessage = useCallback(
      (message: Message) => {
        if (message.queryId) {
          deleteMessageMutation.mutate({ queryId: message.queryId });
        }
      },
      [deleteMessageMutation]
    );

    const handleReaction = useCallback(
      (messageId: string, reaction: MessageReaction["type"]) => {
        // This would typically send to your backend
        const newReaction: MessageReaction = {
          type: reaction,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              const reactions = msg.reactions || [];
              const existingReaction = reactions.find(
                (r) => r.type === reaction
              );

              if (existingReaction) {
                // Remove reaction if it already exists
                return {
                  ...msg,
                  reactions: reactions.filter((r) => r.type !== reaction),
                };
              } else {
                // Add new reaction
                return {
                  ...msg,
                  reactions: [
                    ...reactions.filter((r) => r.type !== reaction),
                    newReaction,
                  ],
                };
              }
            }
            return msg;
          })
        );

        toast.success(`${reaction === "like" ? "Liked" : "Disliked"} message`);
      },
      []
    );

    const clearChat = useCallback(() => {
      setMessages([]);
      setSearchQuery("");
      queryClient.setQueryData(["chatHistory", userId, context], null);
      toast.success("Chat cleared successfully");
    }, [queryClient, userId, context]);

    const exportChat = useCallback(() => {
      try {
        const chatData = {
          title,
          context,
          exportDate: new Date().toISOString(),
          messages: allMessages.map((msg) => ({
            id: msg.id,
            content: msg.content,
            sender: msg.sender,
            timestamp: msg.timestamp,
            ...(msg.sender === "assistant" && {
              metadata: {
                tokens: (msg as AssistantMessage).tokens,
                processingTime: (msg as AssistantMessage).processingTime,
                model: (msg as AssistantMessage).model,
                confidence: (msg as AssistantMessage).confidence,
              },
            }),
          })),
        };

        const blob = new Blob([JSON.stringify(chatData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `chat-export-${
          new Date().toISOString().split("T")[0]
        }.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Chat exported successfully");
      } catch (error) {
        toast.error("Failed to export chat");
        onError?.(error instanceof Error ? error : new Error("Export failed"));
      }
    }, [allMessages, title, context, onError]);

    const focusInput = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    // Imperative handle for ref
    useImperativeHandle(
      ref,
      () => ({
        sendMessage: (message: string) => {
          setInput(message);
          setTimeout(() => handleSendMessage(), 0);
        },
        clearChat,
        exportChat,
        focusInput,
      }),
      [handleSendMessage, clearChat, exportChat, focusInput]
    );

    // Intersection observer for infinite scroll
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );

      const sentinel = document.getElementById("load-more-sentinel");
      if (sentinel) observer.observe(sentinel);

      return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Character count for input
    const characterCount = input.length;
    const isNearLimit = characterCount > 3500;
    const isOverLimit = characterCount > 4000;

    return (
      <div
        className={`flex flex-col h-[70vh] bg-background border border-border rounded-lg shadow-lg overflow-hidden ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              {!isOnline && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <WifiOff className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                {title}
                {isLoading && (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                )}
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3 text-green-500" />
                    {context ? `Specialized in ${context}` : "Online"}
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-red-500" />
                    Offline
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {enableSearch && (
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-white w-40"
                />
              </div>
            )}

            {enableVoice && (
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-full transition-colors ${
                  voiceEnabled
                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
                title={voiceEnabled ? "Disable voice" : "Enable voice"}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              title={isExpanded ? "Minimize" : "Expand"}
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {enableExport && (
              <button
                onClick={exportChat}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Export chat"
                disabled={allMessages.length === 0}
              >
                <Download className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={clearChat}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              title="Clear chat"
              disabled={allMessages.length === 0}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-1"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
          {/* Load more sentinel */}
          <div id="load-more-sentinel" className="h-4" />

          {isHistoryLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
          )}

          {historyError && (
            <div className="flex items-center justify-center gap-2 py-4 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">Failed to load chat history</span>
              <button
                onClick={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["chatHistory", userId, context],
                  })
                }
                className="text-sm underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          )}

          {filteredMessages.length === 0 &&
            !isHistoryLoading &&
            !historyError && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                  {searchQuery ? "No messages found" : "No messages yet"}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  {searchQuery
                    ? `Try adjusting your search for "${searchQuery}"`
                    : `Start the conversation with ${
                        context ? `questions about ${context}` : "a message"
                      }!`}
                </p>
              </div>
            )}

          {filteredMessages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onEdit={() => handleEditMessage(message)}
              onDelete={() => handleDeleteMessage(message)}
              onReact={
                enableReactions
                  ? (reaction) => handleReaction(message.id, reaction)
                  : undefined
              }
              customActions={customActions}
              isEditing={editingMessage?.id === message.id}
              editContent={editingMessage?.content || ""}
              onEditContentChange={(content) =>
                setEditingMessage((prev) =>
                  prev ? { ...prev, content } : null
                )
              }
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
            />
          ))}

          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          {!isOnline && (
            <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm text-yellow-700 dark:text-yellow-300">
                You are offline. Messages will be sent when connection is
                restored.
              </span>
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={context ? `Ask about ${context}...` : placeholder}
                disabled={isLoading || !isOnline}
                className={`w-full px-4 py-3 pr-16 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 transition-colors ${
                  isOverLimit
                    ? "border-red-500 focus:ring-red-500"
                    : isNearLimit
                    ? "border-yellow-500 focus:ring-yellow-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                maxLength={4000}
                aria-label="Message input"
                autoComplete="off"
              />

              {/* Character count */}
              <div
                className={`absolute right-14 top-1/2 transform -translate-y-1/2 text-xs ${
                  isOverLimit
                    ? "text-red-500"
                    : isNearLimit
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                {characterCount}/4000
              </div>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading || !isOnline || isOverLimit}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              aria-label="Send message"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>

          {/* Input hints */}
          {input.length === 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {context && (
                <button
                  onClick={() => setInput(`Tell me about ${context}`)}
                  className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Tell me about {context}
                </button>
              )}
              <button
                onClick={() => setInput("How can you help me?")}
                className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                How can you help me?
              </button>
            </div>
          )}

          {/* Rate limit warning */}
          {isRateLimited() && (
            <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-orange-700 dark:text-orange-300">
                Rate limit reached. Please wait a moment before sending another
                message.
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ChatBotAssistant.displayName = "ChatBotAssistant";

export default ChatBotAssistant;
