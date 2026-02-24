// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "netflix-clone-d01e2.firebaseapp.com",
  projectId: "netflix-clone-d01e2",
  storageBucket: "netflix-clone-d01e2.firebasestorage.app",
  messagingSenderId: "787433423497",
  appId: "1:787433423497:web:f6a1bb72068af15c247c58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error logging in:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
    
}
const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
