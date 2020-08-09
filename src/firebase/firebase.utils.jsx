import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAI7MT1_RYfasiQ83OqUQxUXKVBJ-qI40g',
  authDomain: 'crwn-clothing-tor.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-tor.firebaseio.com',
  projectId: 'crwn-clothing-tor',
  storageBucket: 'crwn-clothing-tor.appspot.com',
  messagingSenderId: '366640017345',
  appId: '1:366640017345:web:872c033f627d994cbec940',
  measurementId: 'G-HMKJHBYCML',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef; 
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
