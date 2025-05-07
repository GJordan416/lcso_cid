// script.js
async function searchSuspect() {
  const input = document.getElementById("usernameInput").value.trim().toLowerCase();
  const resultBox = document.getElementById("searchResults");
  resultBox.innerHTML = "<p>Searching...</p>";

  try {
    const response = await fetch("suspects.json");
    const suspects = await response.json();

    const match = suspects.find(
      (entry) => entry.username.toLowerCase() === input
    );

    if (match) {
      resultBox.innerHTML = `
        <div class="result-card">
          <h3>Username: ${match.username}</h3>
          <p><strong>Role:</strong> ${match.role}</p>
          <p><strong>Affiliation:</strong> ${match.organization}</p>
          <p><a href="https://www.roblox.com/users/${match.userid}/profile" target="_blank">View Profile</a></p>
        </div>
      `;
    } else {
      resultBox.innerHTML = `<p>No suspect found matching username: <strong>${input}</strong></p>`;
    }
  } catch (error) {
    resultBox.innerHTML = `<p>Error retrieving data. Please try again later.</p>`;
    console.error("Error loading suspects.json:", error);
  }
}
