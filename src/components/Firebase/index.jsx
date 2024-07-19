// "use client";

// import firebase from "firebase/app";
// import 'firebase/auth';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const app = initializeApp({
//   apiKey: "AIzaSyCnh7tVOkW4UsvrqTEDtJPVRlryIibSb1s",
//   authDomain: "harmonyhive-b4705.firebaseapp.com",
//   projectId: "harmonyhive-b4705",
//   storageBucket: "harmonyhive-b4705.appspot.com",
//   messagingSenderId: "41274838584",
//   appId: "1:41274838584:web:cdd0eb6e06deb0f0af60cd",
//   measurementId: "G-E2XH6TESCR",
// });

// export const firestore = getFirestore(app);
// export const storage = getStorage(app);

"use client";

import firebase from "firebase/app";
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default firebase;
