/**
 * craft_script.js
 * Handles the search gallery logic and redirection for the team project.
 * Developers: XYZ, ZYX, and REX
 */

// 1. CONFIGURATION
const API_KEY = 'AIzaSyBAod95K6vBdKOzCZaBOwPjpjhQ3vVSxQo'; // Replace with your actual Google Cloud API Key
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * Main function to fetch crafts from YouTube
 * @param {string} query - The search term entered by the user
 */
async function fetchCraftGallery(query = 'best art and craft tutorial') {
    const gallery = document.getElementById('video-gallery');
    
    // Safety check: exit if the gallery container isn't found
    if (!gallery) return;

    try {
        // API PARAMETERS: 
        // type=video (exclues channels/playlists)
        // videoDuration=medium (FILTERS OUT SHORTS - only 4-20 minute videos)
        const params = new URLSearchParams({
            part: 'snippet',
            maxResults: 12,
            q: query,
            type: 'video',
            videoDuration: 'medium', 
            key: API_KEY
        });

        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        const data = await response.json();

        // Error handling for API quota or key issues
        if (data.error) {
            console.error("API Error:", data.error.message);
            gallery.innerHTML = `<p style="color:red; text-align:center; width:100%;">Error: ${data.error.message}</p>`;
            return;
        }

        // Clear existing cards
        gallery.innerHTML = '';

        // 2. CARD GENERATION LOOP
        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const thumbnail = item.snippet.thumbnails.high.url;

            // Create the card element
            const card = document.createElement('div');
            card.className = 'video-card';
            
            // Build the card HTML
            card.innerHTML = `
                <img src="${thumbnail}" class="thumbnail" alt="${title}">
                <div style="padding: 15px;">
                    <h3 style="font-size: 0.95rem; color: #003329; font-weight: 600; line-height: 1.4;">
                        ${title}
                    </h3>
                </div>
            `;

            // 3. REDIRECTION LOGIC
            // On click, move to tutorial.html with video ID and encoded Title
            card.onclick = () => {
                const encodedTitle = encodeURIComponent(title);
                window.location.href = `tutorial.html?v=${videoId}&t=${encodedTitle}`;
            };

            gallery.appendChild(card);
        });

    } catch (error) {
        console.error("Network Error:", error);
        gallery.innerHTML = '<p style="text-align:center; width:100%;">Failed to connect to the server.</p>';
    }
}

/**
 * Initialize event listeners once the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    // Initial load of content
    fetchCraftGallery();

    // Trigger search on button click
    if (searchBtn && searchInput) {
        searchBtn.onclick = () => {
            const userQuery = searchInput.value.trim();
            if (userQuery) {
                fetchCraftGallery(userQuery);
            }
        };

        // Trigger search on "Enter" key
        searchInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                const userQuery = searchInput.value.trim();
                if (userQuery) fetchCraftGallery(userQuery);
            }
        };
    }
});