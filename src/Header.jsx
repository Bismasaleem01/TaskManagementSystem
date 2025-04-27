import React from 'react';
import './index.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  return (
    <div className="header-container">
      <nav className="navbar">
        <p className="logo">Task Tracker</p>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </nav>
    </div>
  );
}
