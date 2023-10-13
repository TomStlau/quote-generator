const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
const quoteElement = document.querySelector('#quote')
const authorElement = document.querySelector('#author')
const loader = document.querySelector('.loader')
const quoteContainer = document.querySelector('#quote-container')
let quotes = []

async function fetchQuotes () {
  loading()
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    quotes = data.filter(isQuoteBest && authorNotAnonymous)
  } catch (error) {
    console.log(error)
  }
}

function loading () {
  loader.hidden = false
  quoteContainer.hidden = true
}

function complete () {
  loader.hidden = true
  quoteContainer.hidden = false
}

function isQuoteBest (quote) {
  return quote.tag === 'general'
}

function authorNotAnonymous (author) {
  return author !== 'Anonymous'
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchQuotes()
  const quote = await getRandomQuote()
  printQuote(quote)
})

async function getRandomQuote () {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}

function printQuote (quote) {
  quoteElement.innerHTML = quote.text
  authorElement.innerHTML = quote.author
  if (quote.text.length > 120) {
    quoteElement.classList.add('long-quote')
  } else {
    quoteElement.classList.remove('long-quote')
  }
  complete()
}

const newQuoteButton = document.querySelector('#new-quote')
newQuoteButton.addEventListener('click', async () => {
  loading()
  const quote = await getRandomQuote()
  printQuote(quote)
})
