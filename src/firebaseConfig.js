import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6c2YAi7_MYCFcD3CVayDld9UcLbZyrbA",
  authDomain: "recetas-531fc.firebaseapp.com",
  projectId: "recetas-531fc",
  storageBucket: "recetas-531fc.appspot.com",
  messagingSenderId: "557526358366",
  appId: "1:557526358366:web:6ad16c317323a73f4d57cf",
  measurementId: "G-E0YXWZ6TBY"
};
// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de autenticación
export const auth = getAuth(app);
