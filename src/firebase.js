import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQLweuVYGwjfBYAmZcaF96xE9JjS1oFE8",
  authDomain: "resource-sharing-4ea72.firebaseapp.com",
  projectId: "resource-sharing-4ea72",
  messagingSenderId: "109412565636",
  appId: "1:109412565636:web:3f0ac04e06ac46dfe378d1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
