import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold">Gadget Service</Link>
        </div>
        <div>
          <Link to="/" className="mx-2">Головна</Link>
          <Link to="/about-us" className="mx-2">Про нас</Link>
          <Link to="/contact" className="mx-2">Контакти</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="mx-2">Адмін-панель</Link>
              <button onClick={logout} className="mx-2 bg-red-500 px-4 py-2 rounded">Вийти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2">Увійти</Link>
              <Link to="/register" className="mx-2">Реєстрація</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
