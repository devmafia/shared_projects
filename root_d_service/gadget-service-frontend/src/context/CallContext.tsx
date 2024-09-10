import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CallRequest {
  _id: string;
  name: string;
  phone: string;
}

interface CallContextType {
  callRequests: CallRequest[];
  addCallRequest: (request: CallRequest) => void;
  updateCallRequest: (_id: string, updatedData: Omit<CallRequest, '_id'>) => void;
  removeCallRequest: (_id: string) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);

  // Add a call request (assuming 'id' is handled by the backend)
  const addCallRequest = (request: CallRequest) => {
    //console.log(request)
    setCallRequests((prevRequests) => [...prevRequests, request]);
  };

  // Update a call request by id
  const updateCallRequest = (_id: string, updatedData: Omit<CallRequest, '_id'>) => {
    setCallRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === _id ? { ...request, ...updatedData } : request
      )
    );
  };

  // Remove a call request by id
  const removeCallRequest = (_id: string) => {
    setCallRequests((prevRequests) => prevRequests.filter((request) => request._id !== _id));
  };

  return (
    <CallContext.Provider value={{ callRequests, addCallRequest, updateCallRequest, removeCallRequest }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = (): CallContextType => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};
