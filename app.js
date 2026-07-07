const apiKey = "31090fe2-48a3-4286-b565-aa560a422e64";

// Live Matches
async function loadLiveMatches() {
  const live = document.getElementById("liveMatches");

  live.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.cricketdata.org/v1/currentMatches?apikey=${apiKey}&offset=0`
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
document.getElementById("news").innerHTML = `
<div class="card">
<h3>Pakistan vs India Match Preview</h3>
<p>Complete preview, probable playing XI and pitch report.</p>
</div>

<div class="card">
<h3>Babar Azam Latest Performance</h3>
<p>Babar Azam ki recent form aur records.</p>
</div>

<div class="card">
<h3>ICC Rankings Update</h3>
<p>Latest ICC Team aur Player Rankings.</p>
</div>
`;


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