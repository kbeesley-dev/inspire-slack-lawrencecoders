var slackConfig = require('./slackconfig.js');
var slackClient = require('slack-client');
var inspire = require('./inspire.js');
var request = require('request');

console.log('slackpost');

inspire.getQuote(function(quote) {
    console.log(quote);
    
    console.log(slackConfig.postingSlackWebHook);
    
    var payload = {
        "text": "*" + quote.quote + "* - _" + quote.author + "_",
        "icon_emoji": ":sunrise:"
    };
    
    console.log(payload);
    console.log(JSON.stringify(payload));
    
    request({
        url: slackConfig.postingSlackWebHook,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: payload
    },
      function(error,response,body) {
            console.log('error:');
        console.log(error);
        console.log('body:');
        console.log(body);
    });
            
});

