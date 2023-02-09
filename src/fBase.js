import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// "Cloud Firestore"는 "NoSQL" 기반 데이터베이스 제공
// 폴더 개념의 Collection이 있고, 안에 documents들이 속해있다. (즉, Collection은 documents 그룹)
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);
