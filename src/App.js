import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './firebase/Auth/Profile/Profile';
import Register from './firebase/Auth/Register/Register';
import VerifyEmail from './firebase/Auth/VerifyEmail/VerifyEmail';
import Login from './firebase/Auth/Login/Login';
import { useState, useEffect } from 'react';
import {auth} from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './router/PrivateRoute';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
  );
}

export default App;
