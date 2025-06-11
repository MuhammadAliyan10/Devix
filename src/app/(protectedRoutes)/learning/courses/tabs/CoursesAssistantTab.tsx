import ChatBotAssistant from "@/components/Assistant/Chatbot";
import React from "react";

type Props = {
  userId: string;
};

const CoursesAssistantTab = ({ userId }: Props) => {
  return (
    <ChatBotAssistant
      title="Course Advisor"
      context="Educational platform for students"
      apiEndpoint="http://localhost:5001/api/chat"
      position="fullscreen"
      customPrompt={`You are a helpful course advisor...${userId}`}
      maxHeight="500px"
      showTimestamp={true}
      allowCopy={true}
    />
  );
};

export default CoursesAssistantTab;
