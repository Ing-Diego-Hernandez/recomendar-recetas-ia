// src/components/Register.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de que esto apunte a tu configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css'; // Importa el archivo de estilos

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
    } catch (err) {
      setError(err.message);
      console.error("Error al registrarse:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container"> {/* Utiliza la clase de estilo existente */}
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p>
        ¿Ya tienes una cuenta? 
        <a href="/login" className="text-blue-500 hover:text-blue-800"> Inicia sesión aquí.</a>
      </p>
    </div>
  );
}

export default Register;
