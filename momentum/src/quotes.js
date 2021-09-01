const quoteWrp = document.createElement('div');
quoteWrp.className = 'quote-wrp'
const quote = document.createElement('span');
quote.className = 'quote-text'
const author = document.createElement('span');
author.className = 'quote-author'

const getQuoteBtn = document.createElement('span');
getQuoteBtn.classList.add('quote-refresh-btn', 'icon-refresh');

quoteWrp.append(quote, author, getQuoteBtn);
app.append(quoteWrp)
function newQuote(){
  const url = lang === 'ru' ? 'assets/quotesRU.json' : 'assets/quotesEN.json'
  fetch(url)
  .then(response => response.text())
  .then(data => {
    const quotes = JSON.parse(data);
    const randQuote = quotes[Math.floor(Math.random() * quotes.length)]
    //console.log(quote.quote)
    quote.innerText = randQuote.quote;
    author.innerText = randQuote.author;
  });
}

getQuoteBtn.addEventListener('click', newQuote)

newQuote()


