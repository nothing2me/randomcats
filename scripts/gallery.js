// Grab the gallery container and the empty-state message.
const gallery = document.getElementById('cat-gallery');
const emptyGalleryMessage = document.getElementById('empty-gallery');

// Read the saved list of liked cat URLs from localStorage.
const likedCats = JSON.parse(localStorage.getItem('likedCats') || '[]');

// Show the empty message only when the user has not liked any cats yet.
emptyGalleryMessage.hidden = likedCats.length > 0;

// Render each liked cat as an image tile inside the gallery grid.
for (const catUrl of likedCats) {
    const img = document.createElement('img');
    img.src = catUrl;
    img.alt = 'Liked cat image';
    img.classList.add('gallery-image');
    gallery.appendChild(img);
}

// Track all gallery images so only one can be expanded at a time.
const galleryImages = document.querySelectorAll('.gallery-image, .cat-gallery img');

galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
        const wasExpanded = img.classList.contains('is-expanded');

        // Collapse any previously expanded image before toggling the clicked one.
        galleryImages.forEach((item) => item.classList.remove('is-expanded'));

        if (!wasExpanded) {
            img.classList.add('is-expanded');
        }
    });
});