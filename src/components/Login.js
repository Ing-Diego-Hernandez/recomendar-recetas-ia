/* src/components/Login.css */
.login-container {
  max-width: 350px;
  margin: 0 auto;
  padding: 40px 30px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.5); 
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); 
  color: #fcfbfb; 
  text-align: center;
}

body {
  background: radial-gradient(circle at top left, #485297, #a0add3, #3d4e6d);
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.login-container h2 {
  font-size: 22px;
  color: #fff;
  font-weight: normal;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.login-container input[type="email"],
.login-container input[type="password"] {
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border: none;
  border-bottom: 1px solid #888;
  background: transparent;
  color: #ddd;
  font-size: 16px;
  outline: none;
}

.login-container input::placeholder {
  color: #ffffff;
}

.login-container button {
  width: 100%;
  padding: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.login-container button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.login-container .error {
  color: #ff4d4d;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.login-container a {
  color: #ffffff;
  font-size: 0.9em;
  text-decoration: none;
}

.login-container .remember-me-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  margin-top: 10px;
  color: #edeaea;
}

.login-container .remember-me-container label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.login-container .remember-me-container input[type="checkbox"] {
  accent-color: #bdbbbb;
}
