import React from "react";
import ChatBotAssistant from "@/components/Assistant/Chatbot";

type Props = {
  userId: string;
};

const CoursesAssistantTab: React.FC<Props> = ({ userId }) => {
  return (
    <ChatBotAssistant
      title="Course Assistant"
      placeholder="Type according to your courses..."
      context="courses"
      systemPrompt="You are a helpful assistant for React development courses. Help students with React concepts, JSX, hooks, and best practices."
      userId={userId}
    />
  );
};

export default CoursesAssistantTab;
