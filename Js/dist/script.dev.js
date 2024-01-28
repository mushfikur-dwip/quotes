"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  var newQuoteButton = document.getElementById("new-quote");
  var copyButton = document.getElementById("copy-button");
  var messengerShareButton = document.getElementById("messenger-share-button");
  var twitterShareButton = document.getElementById("twitter-share-button");
  var quote = document.querySelector("blockquote p");
  var cite = document.querySelector("blockquote cite");

  function updateQuote() {
    var response, data;
    return regeneratorRuntime.async(function updateQuote$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetch("https://api.quotable.io/random"));

          case 2:
            response = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(response.json());

          case 5:
            data = _context.sent;

            if (response.ok) {
              // Update DOM elements with the fetched quote and author
              quote.textContent = data.content;
              cite.textContent = data.author;
            } else {
              // Handle errors
              quote.textContent = "An error occurred";
              console.log(data);
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  } // Attach an event listener to the `new-quote` button to fetch a new quote when clicked


  newQuoteButton.addEventListener("click", updateQuote); // Copy button functionality

  copyButton.addEventListener("click", function () {
    var textToCopy = "".concat(quote.textContent, " - ").concat(cite.textContent);
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = textToCopy;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    alert("Quote copied to clipboard!");
  }); // Messenger Share button functionality

  messengerShareButton.addEventListener("click", function () {
    var message = "Check out this inspiring quote: \"".concat(quote.textContent, "\" - ").concat(cite.textContent);
    var messengerLink = "fb-messenger://share?link=&app_id=&text=".concat(encodeURIComponent(message));
    window.location.href = messengerLink;
  }); // Twitter Share button functionality

  twitterShareButton.addEventListener("click", function () {
    var tweetText = "\"".concat(quote.textContent, "\" - ").concat(cite.textContent);
    var tweetUrl = "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(tweetText));
    window.open(tweetUrl, "_blank");
  }); // Call updateQuote once when the page loads to display an initial quote

  updateQuote();
}); // Call updateQuote once when the page loads to display an initial quote and set the random background color

updateQuote();
document.querySelector(".card").style.backgroundColor = getRandomColor(); // ...
// Attach an event listener to the `new-quote` button to fetch a new quote and set a new random background color when clicked

newQuoteButton.addEventListener("click", function () {
  updateQuote();
  document.querySelector(".card").style.backgroundColor = getRandomColor();
});