/**
 * tutorial_logic.js
 * Handles dynamic content loading for the Tutorial page
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Extract the Video ID and Title from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('v');
    const rawTitle = params.get('t');

    // 2. Identify the HTML containers where content will be injected
    const titleElement = document.getElementById('tut-title');
    const videoElement = document.getElementById('tut-video');
    const stepsBox = document.getElementById('steps-container');

    // 3. Check if we have the necessary data to build the page
    if (videoId && rawTitle) {
        // Decode the title and set it
        titleElement.innerText = decodeURIComponent(rawTitle);
        
        // Set the YouTube embed source
        videoElement.src = `https://www.youtube.com/embed/${videoId}`;
        
        // 4. Define the tutorial steps
        // These can be replaced with an API call in the future
        const tutorialSteps = [
            "Organize your workspace and ensure you have all materials: paper, adhesive, and specific craft tools.",
            "Begin the initial construction by following the folding or cutting patterns demonstrated in the video.",
            "Assemble the core components. Apply adhesive sparingly to ensure a clean finish.",
            "Add final decorative details and allow the project to set or dry completely before handling."
        ];

        // 5. Inject the steps into the HTML
        // This clears the container first to prevent duplicates
        stepsBox.innerHTML = ''; 
        
        tutorialSteps.forEach((step, index) => {
            // We create a new div for each step with professional styling
            const stepCard = document.createElement('div');
            stepCard.className = 'step-card';
            stepCard.style.display = "flex";
            stepCard.style.gap = "20px";
            stepCard.style.background = "white";
            stepCard.style.padding = "25px";
            stepCard.style.borderRadius = "15px";
            stepCard.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
            stepCard.style.alignItems = "center";
            stepCard.style.marginBottom = "15px";

            stepCard.innerHTML = `
                <span style="color:#359381; font-weight:900; font-size:1.5rem;">0${index + 1}</span>
                <p style="color:#555; line-height: 1.6; font-size: 1.1rem;">${step}</p>
            `;
            
            stepsBox.appendChild(stepCard);
        });
    } else {
        // Fallback if the URL is accessed without parameters
        titleElement.innerText = "Tutorial Not Found";
        if (stepsBox) {
            stepsBox.innerHTML = "<p>Please return to the Home page and select a craft to view the guide.</p>";
        }
    }
});