import { initializeApp } from "firebase/app";
import { getAuth, 
         GoogleAuthProvider, 
         signInWithPopup, 
         signInWithRedirect,
        createUserWithEmailAndPassword, 
        UserCredential,
        signOut} from 'firebase/auth';
import { doc,
         getDoc,
         setDoc,
         getFirestore, 
         writeBatch,
         collection,
         query,
         getDocs} from 'firebase/firestore';
import { User } from "../models/users";
import { signInWithEmailAndPassword } from 'firebase/auth';

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

export const handleCreateUser = async (user: Partial<User>) => {

    const {displayName, email} = user;

    // Create User Reference
    const userRef = doc(db,'users',user.uid as string);

    // Get User Document
    const userDoc = await getDoc(userRef);

    // If NEW User
    if(!userDoc.exists()) {
        try {
            // Create New User
            await setDoc(userRef,{
                displayName,
                email,
                createdAt: new Date()
            })
            return userDoc;
        } catch(error) {
            return console.log((error as Error).message)
        }
    }

    return userDoc;

} 

export const createEmailPasswordUser = async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInEmailAndPassword =  async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

export const firebaseLogOut = () => signOut(auth);

export const addCollectionAndDocuments = async (
    collectionKey: string,
    objectsToAdd: {
        title: string,
    }[]
  ) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });
  
    await batch.commit();
};

export const getCategoriesAndDocuments = async (collectionName: string) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  };
  
