import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const apiKey = "31090fe2-48a3-4286-b565-aa560a422e64";

// Live Matches
async function loadLiveMatches() {
  const live = document.getElementById("liveMatches");

  live.innerHTML = "<p>Loading...</p>";

  try {
  const response = await fetch(
  `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
);

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      live.innerHTML = "<p>No Live Matches Right Now</p>";
      return;
    }

    live.innerHTML = "";

    data.data.forEach(match => {
      live.innerHTML += `
      <div class="card">
        <h3>${match.name}</h3>
        <p><strong>Status:</strong> ${match.status}</p>
        <p><strong>Match Type:</strong> ${match.matchType}</p>
      </div>`;
    });

  } catch (error) {
    console.log(error);
    live.innerHTML = "<p>Unable to load live matches.</p>";
  }
}

loadLiveMatches();


// Latest News
async function loadNews() {
  const newsDiv = document.getElementById("news");
  newsDiv.innerHTML = "<p>Loading news...</p>";

  try {
const snapshot = await getDocs(collection(db, "news"));


    newsDiv.innerHTML = "";

    snapshot.forEach((doc) => {
      const news = doc.data();

      newsDiv.innerHTML += `
        <div class="card">
          <h3>${news.title}</h3>
          <p>${news.content}</p>
        </div>
      `;
    });

    if (snapshot.empty) {
      newsDiv.innerHTML = "<p>No news available.</p>";
    }
  } catch (error) {
    console.log(error);
    newsDiv.innerHTML = "<p>Unable to load news.</p>";
  }
}

loadNews();

// Upcoming Matches
document.getElementById("upcoming").innerHTML = `
<div class="card">
<h3>Pakistan vs Australia</h3>
<p>Tomorrow - 7:00 PM</p>
</div>

<div class="card">
<h3>India vs England</h3>
<p>Friday - 3:00 PM</p>
</div>

<div class="card">
<h3>New Zealand vs South Africa</h3>
<p>Saturday - 2:00 PM</p>
</div>
`;
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');

const pages = {
  "babar azam": "babar-azam.html",
  "virat kohli": "virat-kohli.html",
  "shahid afridi": "shahid-afridi.html",
  "shaheen afridi": "shaheen-afridi.html",
  "haris rauf": "haris-rauf.html",
  "fakhar zaman": "fakhar-zaman.html",
  "mohammad rizwan": "mohammad-rizwan.html",
  "naseem shah": "naseem-shah.html"
};

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (pages[query]) {
    window.location.href = pages[query];
  } else {
    alert("Article not found");
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});