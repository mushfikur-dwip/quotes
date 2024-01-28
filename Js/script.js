document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const newQuoteButton = document.getElementById("new-quote");
    const copyButton = document.getElementById("copy-button");
    const messengerShareButton = document.getElementById("messenger-share-button");
    const twitterShareButton = document.getElementById("twitter-share-button");
    const quote = document.querySelector("blockquote p");
    const cite = document.querySelector("blockquote cite");
  
    async function updateQuote() {
      // Fetch a random quote from the Quotable API
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      if (response.ok) {
        // Update DOM elements with the fetched quote and author
        quote.textContent = data.content;
        cite.textContent = data.author;
      } else {
        // Handle errors
        quote.textContent = "An error occurred";
        console.log(data);
      }
    }
  
    // Attach an event listener to the `new-quote` button to fetch a new quote when clicked
    newQuoteButton.addEventListener("click", updateQuote);
  
    // Copy button functionality
    copyButton.addEventListener("click", () => {
      const textToCopy = `${quote.textContent} - ${cite.textContent}`;
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = textToCopy;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextarea);
      alert("Quote copied to clipboard!");
    });
    
// Messenger Share button functionality
messengerShareButton.addEventListener("click", () => {
    const message = `Check out this inspiring quote: "${quote.textContent}" - ${cite.textContent}`;
    const messengerLink = `fb-messenger://share?link=&app_id=&text=${encodeURIComponent(message)}`;
    window.location.href = messengerLink;
});


// Twitter Share button functionality
twitterShareButton.addEventListener("click", () => {
    const tweetText = `"${quote.textContent}" - ${cite.textContent}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, "_blank");
});

  
    // Call updateQuote once when the page loads to display an initial quote
    updateQuote();
  });
   
// Call updateQuote once when the page loads to display an initial quote and set the random background color
updateQuote();
document.querySelector(".card").style.backgroundColor = getRandomColor();

// ...

// Attach an event listener to the `new-quote` button to fetch a new quote and set a new random background color when clicked
newQuoteButton.addEventListener("click", () => {
    updateQuote();
    document.querySelector(".card").style.backgroundColor = getRandomColor();
});
