const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const author = document.getElementById('author')
const tweetButton = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')
const loader = document.getElementById('loader')


function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true
  }
}

// get quotes from api
async function getQuote() {
  showLoadingSpinner()
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
  try {
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()

    if (data.quoteAuthor === "") {
      author.innerText = "Anonymous"
    } else {
      author.innerText = data.quoteAuthor
    }

    if (data.quoteText.length > 125) {
      quoteText.classList.add("long-quote")
    } else {
      quoteText.classList.remove("long-quote")
    }

    quoteText.innerText = data.quoteText

    removeLoadingSpinner()
  } catch (error) {
    //getQuote()
    console.log("whoops no quote", error)
    //console.clear()
  }
}

// tweetQuote function 
function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${ quote } - ${ author }`
  window.open(twitterUrl, "_blank")
}

/// event listener 
newQuoteButton.addEventListener("click", getQuote)
tweetButton.addEventListener("click",tweetQuote)

// on load
getQuote()
//showLoader()