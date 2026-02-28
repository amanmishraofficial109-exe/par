// MODAL CONTROLS
function openContact() {
    document.getElementById('contact-modal').style.display = 'flex';
}
function closeContact() {
    document.getElementById('contact-modal').style.display = 'none';
}

// PARALLAX EFFECT
window.addEventListener('scroll', () => {
    let value = window.scrollY;
    let text = document.getElementById('text');
    if (text) {
        text.style.marginTop = value * 2 + 'px';
    }
});

// SCROLL TO GALLERY
const arrow = document.getElementById('scroll-arrow');
if (arrow) {
    arrow.onclick = () => {
        document.getElementById('craft-gallery-area').scrollIntoView({ behavior: 'smooth' });
    };
}