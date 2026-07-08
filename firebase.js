import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


 
const firebaseConfig = {
  apiKey: "AIzaSyCXEnIpBRKZWHU_aXdTSXgem8J-HA-mB8w",
  authDomain: "cricverse24-pro-ba5b1.firebaseapp.com",
  projectId: "cricverse24-pro-ba5b1",
  storageBucket: "cricverse24-pro-ba5b1.firebasestorage.app",
  messagingSenderId: "200152574632",
  appId: "1:200152574632:web:4d1aaf2ef80a3f1eb6b09d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
