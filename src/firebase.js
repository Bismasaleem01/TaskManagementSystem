import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyATzhWeDaGoI3aSxzJ9AzxmVN87rS-de5c",
  authDomain: "task-manager-e6ab6.firebaseapp.com",
  projectId: "task-manager-e6ab6",
  storageBucket: "task-manager-e6ab6.firebasestorage.app",
  messagingSenderId: "203149145852",
  appId: "1:203149145852:web:0956cf60c6923519e6c979",
  measurementId: "G-SM09TYKWLB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };