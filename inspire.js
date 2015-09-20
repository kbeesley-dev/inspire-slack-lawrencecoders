var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    getQuote: function(callback) { 
                var randPage = Math.floor(Math.random()*101);
                var url = "http://www.goodreads.com/quotes/tag/success";
                if(randPage > 0) url = url + "?page=" + randPage;

                var quoteRet = { "quote":"", "author": "" };

                request(url, function(error,response, data) {
                    if(!error) {
                        var $ = cheerio.load(data);
                        var quotes = $('.quote');
                        if(quotes.length > 0)
                        {
                            randQuoteIndex = Math.floor(Math.random()*quotes.length);
                            var quoteTextEl = quotes.filter(function(index){return index===randQuoteIndex;}).find('.quoteDetails .quoteText');
                            var quoteText = quoteTextEl.first().contents().filter(function() {
                                                                                    return this.type === 'text';
                                                                                    }).text().match(/“(.*?)”/)[1];
                            var quoteAuthor = quoteAuthor = quoteTextEl.find('a').first().text();
                            quoteRet.quote = quoteText;
                            quoteRet.author = quoteAuthor;
                            
                            if(callback && typeof callback === 'function')
                            {
                                callback(quoteRet);
                            }
                        }
                    }
                });
        }
};


        
