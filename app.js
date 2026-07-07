const apiKey = "31090fe2-48a3-4286-b565-aa560a422e64";

// Live Matches
fetch(`https://api.cricketdata.org/v1/currentMatches?apikey=${apiKey}&offset=0`)
.then(res => res.json())
.then(data => {
    const live = document.getElementById("liveMatches");

    if (!data.data || data.data.length === 0) {
        live.innerHTML = "<p>No Live Matches</p>";
        return;
    }

    live.innerHTML = "";

    data.data.forEach(match => {
        live.innerHTML += `
        <div class="card">
            <h3>${match.name}</h3>
            <p>${match.status}</p>
        </div>`;
    });
})
.catch(() => {
    document.getElementById("liveMatches").innerHTML =
    "<p>API Error</p>";
});

// Temporary News
document.getElementById("news").innerHTML = `
<div class="card">
<h3>Latest Cricket News</h3>
<p>News section coming soon...</p>
</div>`;

// Temporary Upcoming
document.getElementById("upcoming").innerHTML = `
<div class="card">
<h3>Upcoming Matches</h3>
<p>Coming soon...</p>
</div>`;