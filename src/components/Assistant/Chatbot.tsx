import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatBotAssistantProps {
  title?: string;
  placeholder?: string;
  context?: string;
  apiEndpoint?: string;
  className?: string;
  theme?: "light" | "dark" | "auto";
  position?: "bottom-right" | "bottom-left" | "center" | "fullscreen";
  defaultOpen?: boolean;
  maxHeight?: string;
  showHeader?: boolean;
  showTimestamp?: boolean;
  allowCopy?: boolean;
  allowClear?: boolean;
  customPrompt?: string;
}

const ChatBotAssistant: React.FC<ChatBotAssistantProps> = ({
  title = "AI Assistant",
  placeholder = "Ask me anything...",
  context = "",
  apiEndpoint = "http://localhost:5001/api/chat",
  className = "",
  position = "bottom-right",
  defaultOpen = false,
  maxHeight = "600px",
  showHeader = true,
  showTimestamp = true,
  allowCopy = true,
  allowClear = true,
  customPrompt = "",
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm your ${title}. How can I help you today?`,
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageCountRef = useRef(messages.length);

  // Auto-scroll to bottom only for non-typing messages
  useEffect(() => {
    // Only scroll if a new non-typing message is added
    if (
      messages.length > lastMessageCountRef.current &&
      (!messages[messages.length - 1].isTyping || messages.length === 1)
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    lastMessageCountRef.current = messages.length;
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      content: "",
      sender: "assistant",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input.trim(),
          context: context,
          customPrompt: customPrompt,
          history: messages.slice(-10), // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Remove typing indicator and add real response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== "typing");
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            content:
              data.response ||
              data.message ||
              "Server is busy. Please try again later.",
            sender: "assistant",
            timestamp: new Date(),
          },
        ];
      });
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== "typing");
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            content: "Server is busy. Please try again later.",
            sender: "assistant",
            timestamp: new Date(),
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: `Hello! I'm your ${title}. How can I help you today?`,
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  const copyMessage = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      case "fullscreen":
        return "";
      default:
        return "bottom-4 right-4";
    }
  };

  // Chat bubble component
  const ChatBubble = ({ message }: { message: Message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } mb-4 group`}
    >
      <div
        className={`flex max-w-[80%] ${
          message.sender === "user" ? "flex-row-reverse" : "flex-row"
        } items-end gap-2`}
      >
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.sender === "user"
              ? "bg-blue-600 dark:bg-blue-500"
              : "bg-gray-600 dark:bg-gray-400"
          }`}
        >
          {message.sender === "user" ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </motion.div>

        {/* Message content */}
        <div
          className={`relative ${message.sender === "user" ? "mr-2" : "ml-2"}`}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              message.sender === "user"
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            } ${message.isTyping ? "min-h-[48px] flex items-center" : ""}`}
          >
            {message.isTyping ? (
              <div className="flex space-x-1">
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            ) : (
              <div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                {showTimestamp && (
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100 dark:text-blue-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Copy button */}
          {allowCopy && !message.isTyping && (
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className={`absolute -top-2 ${
                message.sender === "user" ? "-left-8" : "-right-8"
              }
                         p-1 rounded-full bg-gray-200 dark:bg-gray-600 opacity-0 group-hover:opacity-100
                         transition-opacity duration-200 hover:bg-gray-300 dark:hover:bg-gray-500`}
              onClick={() => copyMessage(message.content, message.id)}
            >
              {copiedId === message.id ? (
                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (position === "fullscreen") {
    return (
      <div className={`relative bg-background h-[70vh] ${className}`}>
        <div className="flex flex-col w-full h-full">
          {/* Header */}
          {showHeader && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between p-4 border-b border-border bg-card shrink-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-700 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                    {title}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {allowClear && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearChat}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ width: "100%", minHeight: 0, overflowY: "auto" }}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-4 mb-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 shrink-0"
              >
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 border-t border-border bg-card shrink-0"
            style={{ width: "100%" }}
          >
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-indigo-600
                           focus:border-transparent bg-card text-primary
                           placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600
                           text-white rounded-lg font-medium transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50 ${className}`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                       text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            {showHeader && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-blue-100">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {allowClear && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearChat}
                      className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                      title="Clear chat"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4" />
                    ) : (
                      <Minimize2 className="w-4 h-4" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Messages */}
                  <div
                    className="overflow-y-auto p-4 space-y-4"
                    style={{ maxHeight, width: "100%" }}
                  >
                    <AnimatePresence>
                      {messages.map((message) => (
                        <ChatBubble key={message.id} message={message} />
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mx-4 mb-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        disabled={isLoading}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                   focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                                   placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isLoading}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                                   text-white rounded-lg transition-colors duration-200
                                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBotAssistant;
