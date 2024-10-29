// src/App.js
import './App.css';
import RecipeRecommender from './components/recipe-recommender';
import Login from './components/Login';
import Register from './components/Register'; // Importa el componente de registro
import { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/recommender" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/recommender" /> : <Register />} />
          <Route path="/recommender" element={user ? <RecipeRecommender /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
