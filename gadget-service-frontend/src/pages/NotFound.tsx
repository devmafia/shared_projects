import React from 'react';
import CallWidget from '../components/CallWidget';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <CallWidget />
    </div>
  );
};

export default NotFound;
