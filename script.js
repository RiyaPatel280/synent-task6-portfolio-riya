const input = document.getElementById("username");
const btn = document.getElementById("searchBtn");
const profileBox = document.getElementById("profile");
const statusEl = document.getElementById("status");

btn.addEventListener("click", fetchProfile);

async function fetchProfile() {
    const username = input.value.trim();

    if (username === "") {
        statusEl.textContent = "Please enter a username.";
        return;
    }

    try {
        statusEl.textContent = "Loading...";
        profileBox.classList.add("hidden");

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        profileBox.innerHTML = `
            <img src="${data.avatar_url}" alt="avatar">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || "No bio available"}</p>

            <div class="stats">
                <div>Repos<br>${data.public_repos}</div>
                <div>Followers<br>${data.followers}</div>
                <div>Following<br>${data.following}</div>
            </div>

            <a href="${data.html_url}" target="_blank">View Profile</a>
        `;

        profileBox.classList.remove("hidden");
        statusEl.textContent = "";

    } catch (error) {
        statusEl.textContent = "User not found or error occurred.";
        console.error(error);
    }
}