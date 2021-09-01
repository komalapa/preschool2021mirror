const quoteWrp = document.createElement('div');
quoteWrp.className = 'quote-wrp'
const quote = document.createElement('span');
quote.className = 'quote-text'
const author = document.createElement('span');
author.className = 'quote-author'

quoteWrp.append(quote,author);
app.append(quoteWrp)

fetch('assets/quotesRU.json')
  .then(response => response.text())
  .then(data => {
    const quotes = JSON.parse(data);
    const randQuote = quotes[Math.floor(Math.random() * quotes.length)]
    //console.log(quote.quote)
    quote.innerText = randQuote.quote;
    author.innerText = randQuote.author;
  });