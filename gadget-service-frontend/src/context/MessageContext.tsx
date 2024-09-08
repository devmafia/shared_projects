// MessageContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
}

interface MessageContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
  updateMessage: (_id: string, updatedData: Omit<Message, '_id'>) => void;
  removeMessage: (_id: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Add a message (assuming 'id' comes from backend)
  const addMessage = (msg: Message) => {
    //console.log(msg)
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  // Update a message by _id
  const updateMessage = (_id: string, updatedData: Omit<Message, '_id'>) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === _id ? { ...msg, ...updatedData } : msg
      )
    );
  };

  // Remove a message by id
  const removeMessage = (_id: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== _id));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, updateMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
