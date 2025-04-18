// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  Firestore,
  query,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDb3EsjARjdXkhvJIAIxmEPin4BgnGVh2M',
  authDomain: 'tea-on-ztm-crwn-clothing-db.firebaseapp.com',
  projectId: 'tea-on-ztm-crwn-clothing-db',
  storageBucket: 'tea-on-ztm-crwn-clothing-db.firebasestorage.app',
  messagingSenderId: '987970837596',
  appId: '1:987970837596:web:67f862694ebe5a3ec5da99'
};

// Firebase
const firebaseApp = initializeApp(firebaseConfig);;

// Providers
const firebaseProvider = new GoogleAuthProvider();
firebaseProvider.setCustomParameters({
  prompt: 'select_account'
})

// Auth
export const auth = getAuth();
export const signInWithGooglePopup = async () => await signInWithPopup(auth, firebaseProvider);
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;

  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}

// Firestore DB
export const firestoreDB = getFirestore();

export const createUserDoc = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return null;

  const userDocRef = doc(firestoreDB, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      })
    } catch (err) {
      console.log('error creating the user', err.message);
    }
  }

  return userDocRef;
}

export const addCollectionAndDocs = async (collectionKey, docs, field) => {
  const collectionRef = collection(firestoreDB, collectionKey);
  const batch = writeBatch(firestoreDB);

  docs.forEach(document => {
    const docRef = doc(collectionRef, document[field].toLowerCase());
    batch.set(docRef, document);
  })

  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(firestoreDB, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};
