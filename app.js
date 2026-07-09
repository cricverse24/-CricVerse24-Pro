import { db } from "./firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const apiKey = "31090fe2-48a3-4286-b565-aa560a422e64";

// ================= LIVE MATCHES =================
// Live Matches
async function loadLiveMatches() {
  const live = document.getElementById("liveMatches");
  live.innerHTML = "<p>Loading...</p>";

  const CACHE_KEY = "cricverse_live_matches";
  const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

  // Check cache
  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    const cacheData = JSON.parse(cached);

    if (Date.now() - cacheData.time < CACHE_TIME) {
      displayMatches(cacheData.data);
      return;
    }
  }

  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const data = await response.json();

    if (data.status === "failure") {
      live.innerHTML = `<p>${data.reason}</p>`;
      return;
    }

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        time: Date.now(),
        data: data.data,
      })
    );

    displayMatches(data.data);

  } catch (error) {
    console.log(error);
    live.innerHTML = "<p>Unable to load live matches.</p>";
  }

  function displayMatches(matches) {
    if (!matches || matches.length === 0) {
      live.innerHTML = "<p>No Live Matches Right Now</p>";
      return;
    }

    live.innerHTML = "";

    matches.forEach(match => {
      live.innerHTML += `
<div class="card">
    <h3>${match.name}</h3>

    <p><strong>Status:</strong> ${match.status || "N/A"}</p>

    <p><strong>Score:</strong><br>
${
  Array.isArray(match.score) && match.score.length
    ? match.score.map(s =>
        `${s.inning || ""}: ${s.r ?? "-"} / ${s.w ?? "-"} (${s.o ?? "-"} ov)`
      ).join("<br>")
    : "Live score not available yet"
}
</p>

    <p><strong>Toss:</strong> ${match.toss || "Not Available"}</p>

    <p><strong>Venue:</strong> ${match.venue || "Not Available"}</p>

    <p><strong>Result:</strong> ${match.matchWinner || match.result || "Pending"}</p>

    <p><strong>Match Type:</strong> ${match.matchType || "N/A"}</p>
</div>
`;
    });
  }
}

loadLiveMatches();

// ================= NEWS =================
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
      </div>`;
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

// ================= UPCOMING MATCHES =================
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

// ================= SEARCH =================
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

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