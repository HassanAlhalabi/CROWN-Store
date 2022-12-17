import { initializeApp } from "firebase/app";
import { getAuth, 
         GoogleAuthProvider, 
         signInWithPopup, 
         signInWithRedirect } from 'firebase/auth';
import { doc,
         getDoc,
         setDoc,
         getFirestore } from 'firebase/firestore';
import { GoogleUser } from "../models/users";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDImsTqbWbgYBJRj-jVwXGo5qudLYxRCQ8",
  authDomain: "crown-ec3b3.firebaseapp.com",
  projectId: "crown-ec3b3",
  storageBucket: "crown-ec3b3.appspot.com",
  messagingSenderId: "804841354248",
  appId: "1:804841354248:web:d885f1801be8dc09d8cdbd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    'prompt': "select_account"
})
export const auth = getAuth();

export const loginWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const loginWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const handleCreateGoogleUser = async (user: GoogleUser) => {

    // Create User Reference
    const userRef = doc(db,'users',user.uid);

    // Get User Document
    const userDoc = await getDoc(userRef);

    // If NEW User
    if(!userDoc.exists()) {
        try {
            // Create New User
            await setDoc(userRef,{
                ...user,
                createdAt: new Date()
            })
            return userDoc;
        } catch(error) {
            console.log((error as Error).message)
        }
    }

    return userDoc;

} 
