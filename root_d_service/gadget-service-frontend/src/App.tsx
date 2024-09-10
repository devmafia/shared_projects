import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CallProvider } from './context/CallContext';
import Routes from './routes';
import { MessageProvider } from './context/MessageContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MessageProvider>
        <CallProvider>
          <Routes />
        </CallProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;
