import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJ9O84yArZm_8I1X7dQgd8trZIwxmdQiw",
    authDomain: "livememory-254a1.firebaseapp.com",
    projectId: "livememory-254a1",
    storageBucket: "livememory-254a1.appspot.com", // Исправьте на правильный storageBucket
    messagingSenderId: "657197404816",
    appId: "1:657197404816:web:4a467be893cb06307abe15",
    measurementId: "G-VMJGZLKB82"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };