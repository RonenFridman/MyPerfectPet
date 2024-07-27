function createAlphabetGrid() {
    // Define the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');
    
    // Select the parent element where the grid will be appended
    const gridContainer = document.querySelector('.alphabet-grid');
    
    // Clear existing content
    gridContainer.innerHTML = '';
    
    // Create and append each letter to the grid
    alphabet.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.className = 'alphabet-letter';
        letterElement.textContent = letter;
        gridContainer.appendChild(letterElement);
    });
}


document.getElementById('confirmBtn').addEventListener('click', function() {
    window.location.href = 'petScreen.html'; // Replace 'nextPage.html' with the URL of the page you want to navigate to
});

document.addEventListener("DOMContentLoaded", () => {
    createAlphabetGrid();
    const letters = document.querySelectorAll(".alphabet-letter");
    const nameDisplay = document.querySelectorAll(".name-display .letter");
    let currentIndex = 0;

    letters.forEach(letter => {
        letter.addEventListener("click", () => {
            if (currentIndex < nameDisplay.length) {
                nameDisplay[currentIndex].textContent = letter.textContent;
                currentIndex++;
            }
        });
    });
});

