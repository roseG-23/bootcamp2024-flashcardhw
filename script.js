const flashcards = [
    { term: "HTML", definition: "HyperText Markup Language" },
    { term: "CSS", definition: "Cascading Style Sheets" },
    { term: "JavaScript", definition: "Programming language of the web" }
];

// You can use flashcards.length to get the length of the array

// These two variables will come in handy
let currentIndex = 0;
let showingTerm = true;

// place where information about the flashcard is presented
let flashContent = document.getElementById("card-content");
const flashCard = document.getElementById("flashcard");


// Start with this function to simply display the card
function displayCard() {

    // if the term is being shown, show the definition and vice versa
    if(showingTerm){
        flashContent.innerHTML = flashcards[currentIndex].term;
    } else {
        flashContent.innerHTML = flashcards[currentIndex].definition;
    }
    
}

// The rest of the code you will write is apart of event listeners

// if the flashcard display is clicked, switch its side
flashCard.addEventListener("click", () => {
    showingTerm = !showingTerm; // flipping each time the card is clicked
    displayCard();
});

// gives functionality to previous button, supports wrap-around
document.getElementById("prev-btn").addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? flashcards.length - 1 : currentIndex - 1;
    showingTerm = true; // ensures term is shown for the prev card
    displayCard();
});

// gives functionality to next button, supports wrap-around
document.getElementById("next-btn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % (flashcards.length);
    showingTerm = true; // ensures term is shown for the next card
    displayCard();
});

// allows user to add a card to the accumulated flashcards
function addCard() {
    const newTerm = document.getElementById("new-term").value;
    const newDef = document.getElementById("new-definition").value;

    // non-empty strings are truthy, should only populate if info provided
    if(newTerm && newDef){
            flashcards.push({term: newTerm, definition: newDef});
    }

    // emptying fields for user to continue adding cards
    document.getElementById("new-term").value = "";
    document.getElementById("new-definition").value = "";

    // immediately showing newly added card
    currentIndex = flashcards.length - 1;
    showingTerm = true;
    displayCard();
}

// adds the card once the appropriate button is clicked
document.getElementById("add-card-btn").addEventListener("click", addCard);


// This line will display the card when the page is refreshed
window.onload = displayCard;
