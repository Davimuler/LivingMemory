import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

// Импортируем Firebase v9
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {Provider} from "react-redux";


const firebaseConfig = {
  apiKey: "AIzaSyCJ9O84yArZm_8I1X7dQgd8trZIwxmdQiw",
  authDomain: "livememory-254a1.firebaseapp.com",
  projectId: "livememory-254a1",
  storageBucket: "livememory-254a1.appspot.com", // Исправьте на правильный storageBucket
  messagingSenderId: "657197404816",
  appId: "1:657197404816:web:4a467be893cb06307abe15",
  measurementId: "G-VMJGZLKB82"
};

const app = initializeApp(firebaseConfig); // Инициализируем Firebase
const auth = getAuth(app); // Инициализируем Auth
const firestore = getFirestore(app); // Инициализируем Firestore

// Создаем контекст
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Context.Provider value={{
            firestore,
            auth,
            firebase: app // Передаем инициализированное приложение Firebase
        }}>
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </Context.Provider>
    </Provider>,

);

reportWebVitals();