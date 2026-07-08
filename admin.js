import { db } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById("saveNews").addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    await addDoc(collection(db, "news"), {
      title,
      content,
      createdAt: Date.now()
    });

    alert("News published successfully!");
  } catch (e) {
    alert("Error: " + e.message);
  }
});

document.getElementById("saveMatch").addEventListener("click", async () => {
  const team1 = document.getElementById("team1").value;
  const team2 = document.getElementById("team2").value;
  const score = document.getElementById("score").value;

  try {
    await addDoc(collection(db, "matches"), {
      team1,
      team2,
      score,
      updatedAt: Date.now()
    });

    alert("Match updated successfully!");
  } catch (e) {
    alert("Error: " + e.message);
  }
});
