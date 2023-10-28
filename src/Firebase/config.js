import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, query, where,getDoc, getDocs,collection, addDoc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQk_OaWiMhZmq3QuIrG1uALTXzKefXsaY",
  authDomain: "devathon-e72a5.firebaseapp.com",
  projectId: "devathon-e72a5",
  storageBucket: "devathon-e72a5.appspot.com",
  messagingSenderId: "79319589217",
  appId: "1:79319589217:web:0bf4e10f17781da00d6520",
  measurementId: "G-NK9XV5FPLS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage();
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, auth, doc, setDoc, db, signOut, getStorage, ref, uploadBytes, storage, collection, query, where, getDocs, onAuthStateChanged, getDownloadURL,addDoc, onSnapshot,getFirestore,getDoc }