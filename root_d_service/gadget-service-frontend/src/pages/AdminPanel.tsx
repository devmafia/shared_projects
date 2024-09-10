// AdminPanel.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCall } from '../context/CallContext';
import { useMessage } from '../context/MessageContext';
import { useAuth } from '../context/AuthContext';

const AdminPanel: React.FC = () => {
  const { callRequests, addCallRequest, updateCallRequest, removeCallRequest } = useCall();
  const { messages, addMessage, updateMessage, removeMessage } = useMessage();
  const { isAuthenticated } = useAuth();

  const [newCallData, setNewCallData] = useState({ name: '', phone: '' });
  const [editCall_id, setEditCall_id] = useState<string | null>(null);
  const [editCallData, setEditCallData] = useState({ name: '', phone: '' });

  const [newMessageData, setNewMessageData] = useState({ name: '', email: '', message: '' });
  const [editMessage_id, setEditMessage_id] = useState<string | null>(null);
  const [editMessageData, setEditMessageData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    let isMounted = true; // Prevent state update after component unmount
  
    const fetchData = async () => {
      if (!isAuthenticated || !isMounted) return;
  
      try {
        // Fetch Call Requests
        const callResponse = await axios.get('http://localhost:5000/api/call-requests', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
  
        console.log('Call Requests Response:', callResponse.data);
  
        // Update state only once when data is fetched
        if (isMounted) {
          callResponse.data.forEach((request: any) => addCallRequest(request));
        }
  
        // Fetch Messages
        const messageResponse = await axios.get('http://localhost:5000/api/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
  
        console.log('Messages Response:', messageResponse.data);
  
        // Update state only once when data is fetched
        if (isMounted) {
          messageResponse.data.forEach((message: any) => addMessage(message));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [isAuthenticated]);
  
  
  
  if (!isAuthenticated) {
    return <div>Доступ заборонено. Будь ласка, увійдіть в систему.</div>;
  }

  // Handlers for adding and updating Call Requests
  const handleAddCall = () => {
    const newCallRequest = {
      name: newCallData.name,
      phone: newCallData.phone,
    };
    axios.post('http://localhost:5000/api/call-requests/create', newCallRequest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => {
        console.log(response.data)
        addCallRequest(response.data);
        setNewCallData({ name: '', phone: '' });
      })
      .catch(error => console.error('Error adding call request:', error));
  };

  const handleUpdateCall = () => {
    if (editCall_id) {
      const updatedRequest = editCallData;
      axios.put(`http://localhost:5000/api/call-requests/update/${editCall_id}`, updatedRequest, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
        .then(() => {
          updateCallRequest(editCall_id, updatedRequest);
          setEditCall_id(null);
          setEditCallData({ name: '', phone: '' });
        })
        .catch(error => console.error('Error updating call request:', error));
    }
  };

  const handleRemoveCall = (_id: string) => {
    axios.delete(`http://localhost:5000/api/call-requests/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(() => removeCallRequest(_id))
      .catch(error => console.error('Error removing call request:', error));
  };

  const handleEditCall = (_id: string) => {
    const callRequest = callRequests.find(request => request._id === _id);
    if (callRequest) {
      setEditCall_id(_id);
      setEditCallData({ name: callRequest.name, phone: callRequest.phone });
    }
  };

  const handleEditMessage = (_id: string) => {
    const message = messages.find((msg:any) => msg._id === _id);
    if (message) {
      setEditMessage_id(_id);
      setEditMessageData({ name: message.name, email: message.email, message: message.message });
    }
  };

  // Handlers for adding and updating Messages
  const handleAddMessage = () => {
    const newMessage = {
      name: newMessageData.name,
      email: newMessageData.email,
      message: newMessageData.message,
    };
    axios.post('http://localhost:5000/api/messages/create', newMessage, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => {
        console.log('handled')
        addMessage(response.data);
        setNewMessageData({ name: '', email: '', message: '' });
      })
      .catch(error => console.error('Error adding message:', error));
  };

  const handleUpdateMessage = () => {
    if (editMessage_id) {
      const updatedMessage = editMessageData;
      console.log(editMessage_id)
      axios.put(`http://localhost:5000/api/messages/update/${editMessage_id}`, updatedMessage, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
        .then(() => {
          updateMessage(editMessage_id, updatedMessage);
          setEditMessage_id(null);
          setEditMessageData({ name: '', email: '', message: '' });
        })
        .catch(error => console.error('Error updating message:', error));
    }
  };

  const handleRemoveMessage = (_id: string) => {
    axios.delete(`http://localhost:5000/api/messages/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(() => removeMessage(_id))
      .catch(error => console.error('Error removing message:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Адмін-панель</h1>

      {/* Add Call Request Form */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Додати запит на дзвінок</h2>
        <input
          type="text"
          value={newCallData.name}
          onChange={(e) => setNewCallData({ ...newCallData, name: e.target.value })}
          placeholder="Ім'я"
          className="border p-2 mb-2"
        />
        <input
          type="text"
          value={newCallData.phone}
          onChange={(e) => setNewCallData({ ...newCallData, phone: e.target.value })}
          placeholder="Телефон"
          className="border p-2 mb-2"
        />
        <button onClick={handleAddCall} className="bg-blue-500 text-white p-2 rounded">
          Додати
        </button>
      </div>

      {/* Edit Call Request Form */}
      {editCall_id && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Редагувати запит на дзвінок</h2>
          <input
            type="text"
            value={editCallData.name}
            onChange={(e) => setEditCallData({ ...editCallData, name: e.target.value })}
            placeholder="Ім'я"
            className="border p-2 mb-2"
          />
          <input
            type="text"
            value={editCallData.phone}
            onChange={(e) => setEditCallData({ ...editCallData, phone: e.target.value })}
            placeholder="Телефон"
            className="border p-2 mb-2"
          />
          <button onClick={handleUpdateCall} className="bg-blue-500 text-white p-2 rounded">
            Оновити
          </button>
        </div>
      )}

      {/* Call Requests Table */}
      <h2 className="text-xl font-semibold mb-2">Запити на дзвінки</h2>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">_id</th>
            <th className="border border-gray-300 p-2">Ім'я</th>
            <th className="border border-gray-300 p-2">Телефон</th>
          </tr>
        </thead>
        <tbody>
          {callRequests.map(request => (
            <tr key={request._id}>
              <td className="border border-gray-300 p-2">{request._id}</td>
              <td className="border border-gray-300 p-2">{request.name}</td>
              <td className="border border-gray-300 p-2">{request.phone}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleEditCall(request._id)} className="bg-yellow-500 text-white p-1 rounded">
                  Редагувати
                </button>
                <button onClick={() => handleRemoveCall(request._id)} className="bg-red-500 text-white p-1 rounded">
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Message Form */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Додати повідомлення</h2>
        <input
          type="text"
          value={newMessageData.name}
          onChange={(e) => setNewMessageData({ ...newMessageData, name: e.target.value })}
          placeholder="Ім'я"
          className="border p-2 mb-2"
        />
        <input
          type="email"
          value={newMessageData.email}
          onChange={(e) => setNewMessageData({ ...newMessageData, email: e.target.value })}
          placeholder="Email"
          className="border p-2 mb-2"
        />
        <textarea
          value={newMessageData.message}
          onChange={(e) => setNewMessageData({ ...newMessageData, message: e.target.value })}
          placeholder="Повідомлення"
          className="border p-2 mb-2"
        />
        <button onClick={handleAddMessage} className="bg-blue-500 text-white p-2 rounded">
          Додати
        </button>
      </div>

      {/* Edit Message Form */}
      {editMessage_id && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Редагувати повідомлення</h2>
          <input
            type="text"
            value={editMessageData.name}
            onChange={(e) => setEditMessageData({ ...editMessageData, name: e.target.value })}
            placeholder="Ім'я"
            className="border p-2 mb-2"
          />
          <input
            type="email"
            value={editMessageData.email}
            onChange={(e) => setEditMessageData({ ...editMessageData, email: e.target.value })}
            placeholder="Email"
            className="border p-2 mb-2"
          />
          <textarea
            value={editMessageData.message}
            onChange={(e) => setEditMessageData({ ...editMessageData, message: e.target.value })}
            placeholder="Повідомлення"
            className="border p-2 mb-2"
          />
          <button onClick={handleUpdateMessage} className="bg-blue-500 text-white p-2 rounded">
            Оновити
          </button>
        </div>
      )}

      {/* Messages Table */}
      <h2 className="text-xl font-semibold mb-2">Повідомлення</h2>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">_id</th>
            <th className="border border-gray-300 p-2">Ім'я</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Повідомлення</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg:any) => (
            <tr key={msg._id}>
              <td className="border border-gray-300 p-2">{msg._id}</td>
              <td className="border border-gray-300 p-2">{msg.name}</td>
              <td className="border border-gray-300 p-2">{msg.email}</td>
              <td className="border border-gray-300 p-2">{msg.message}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleEditMessage(msg._id)} className="bg-yellow-500 text-white p-1 rounded">
                  Редагувати
                </button>
                <button onClick={() => handleRemoveMessage(msg._id)} className="bg-red-500 text-white p-1 rounded">
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;