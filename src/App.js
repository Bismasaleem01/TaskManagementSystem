// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import SignUp from './SignUp';
import Login from './Login';
import Taskboard from './Taskboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser);
        setUser(currentUser);
      } else {
        console.log("No user is logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/taskboard" element={user ? <Taskboard user={user} /> : <Login />} />
      <Route path="/" element={user ? <Taskboard user={user} /> : <Login />} />
    </Routes>
  );
}

export default App;
