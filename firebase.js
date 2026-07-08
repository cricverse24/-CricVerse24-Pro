import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YAHAN_APNI_API_KEY",
  authDomain: "YAHAN_AUTH_DOMAIN",
  projectId: "YAHAN_PROJECT_ID",
  storageBucket: "YAHAN_STORAGE_BUCKET",
  messagingSenderId: "YAHAN_SENDER_ID",
  appId: "YAHAN_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
