/* main.js - handles the random cat image viewer and the like/dislike buttons*/

// Store the current cat image URL so the app can save or compare it later.
let currentCatUrl = null;

// Grab the main viewer elements from the page.
const image = document.querySelector('#cat-image');
const likeButton = document.querySelector('#like-button');
const dislikeButton = document.querySelector('#dislike-button');

// Keep the original button labels so they can be restored after a new image loads
const defaultLikeText = likeButton.textContent;
const defaultDislikeText = dislikeButton.textContent;

/* Fetch a random cat image from The Cat API */
async function loadCat() {
    try {
        // Request one image and include breed details when available.
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&include[]=breeds', {
            headers: {
                'x-api-key': 'YOUR_API_KEY' // Replace with an actual API key
            }
        });

        const cats = await response.json();
        const cat = cats[0];

        // Use the breed name in the image alt text when present, otherwise fall back to "unknown".
        const breedName = cat?.breeds?.length ? cat.breeds[0].name : 'unknown';
        image.alt = `${breedName} breed of cat.`;
        currentCatUrl = cat?.url;

        // Wait until the image has fully loaded before showing it and resetting button text
        image.onload = () => {
            image.hidden = false;
            likeButton.textContent = defaultLikeText;
            dislikeButton.textContent = defaultDislikeText;
        };

        image.src = currentCatUrl;
    } catch (error) {
        console.error('Error fetching cat image:', error);
    }
}

/* Button func to save the current cat in localStorage when liked */
likeButton.addEventListener('click', () => {
    const likedCats = JSON.parse(localStorage.getItem('likedCats')) || [];

    // Prevent duplicates from being saved in localStorage
    if (!likedCats.includes(currentCatUrl)) {
        likedCats.push(currentCatUrl);
        localStorage.setItem('likedCats', JSON.stringify(likedCats));
    }

    likeButton.textContent = 'u liked this cat';
    loadCat();
});

/* Load the next cat if a user dislikes it */
dislikeButton.addEventListener('click', () => {
    dislikeButton.textContent = 'u disliked this cat';
    loadCat();
});

// Load a cat on page load
loadCat();