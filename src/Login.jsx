import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './index.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully!');

      const user = auth.currentUser;
      console.log('User:', user); 
      setTimeout(() => {
        console.log("Redirecting to Taskboard...");
        navigate('/taskboard');
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div>
      <Header />
      <div className='logCont'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleSignUpRedirect}>Sign up</button>
      </div>
    </div>
  );
};

export default Login;
