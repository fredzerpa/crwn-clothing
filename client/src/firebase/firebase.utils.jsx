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

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
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

export const getUserCartRef = async (userId) => {
  const userCartRef = firestore.collection('carts').where('userId', '==', userId);
  const snapshot = await userCartRef.get();
  if (snapshot.empty) {
    const userCartDocRef = firestore.collection('carts').doc();
    const updatedAt = new Date();
    try {
      await userCartDocRef.set({
        userId,
        cartItems: [],
        updatedAt
      });
    } catch (error) {
      console.log(`Error fetching cart from User: ${userId} \n${error.message}`);
    }

    return userCartDocRef;
  }
  
  return snapshot.docs[0].ref;
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocumentRef = collectionRef.doc();
    batch.set(newDocumentRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshotToMap = collection => {
  const transformedCollection = collection.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
