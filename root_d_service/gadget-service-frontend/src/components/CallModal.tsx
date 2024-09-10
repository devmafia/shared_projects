// CallModal.tsx

import React, { useState } from 'react';
import axios from 'axios';
// import { sendCallRequestToTelegram } from '../services/telegramBot';  // Імпортуємо функцію

interface CallModalProps {
  closeModal: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Надсилання даних на сервер
      await axios.post('http://localhost:5000/api/call-requests/create', {
        name,
        phone,
      });
      alert("Your call has been booked")

      // Надсилання запиту на дзвінок до Телеграм
      //await sendCallRequestToTelegram(name, phone);

      closeModal();  // Закриття модального вікна після успішного запиту
    } catch (err) {
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Request a Call</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-2 rounded-md"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
