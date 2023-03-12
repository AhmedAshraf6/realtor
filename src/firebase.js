import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDkS4FXYnuDCDkqTAMOI6ky995qRY8fM-k',
  authDomain: 'realtor-97108.firebaseapp.com',
  projectId: 'realtor-97108',
  storageBucket: 'realtor-97108.appspot.com',
  messagingSenderId: '229382928332',
  appId: '1:229382928332:web:8d5129b320a8979a9fcf69',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
