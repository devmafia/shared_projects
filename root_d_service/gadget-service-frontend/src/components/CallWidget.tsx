import React, { useState } from 'react';
import CallModal from './CallModal';

const CallWidget: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
        <h4 className="text-lg font-bold">Request a Call</h4>
        <p>Need immediate assistance? Click below to request a call back from our support team.</p>
        <button
          onClick={openModal}
          className="bg-white text-primary py-2 px-4 rounded-md mt-2 hover:bg-gray-100 transition"
        >
          Request Call
        </button>
      </div>

      {isModalOpen && <CallModal closeModal={closeModal} />}
    </>
  );
};

export default CallWidget;
