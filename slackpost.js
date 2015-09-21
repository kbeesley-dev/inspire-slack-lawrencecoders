var slackConfig = require('./slackconfig.js');
var inspire = require('./inspire.js');
var request = require('request');

console.log('slackpost');

inspire.getQuote(function(quote) {
    console.log('Processing Hooks: ');
    console.log(slackConfig.postingSlackWebHook);
    
    var payload = {
        "text": "*" + quote.quote + "* - _" + quote.author + "_",
        "icon_emoji": ":sunrise:"
    };
    
    console.log(payload);
    
    if(slackConfig.postingSlackWebHook && Array.isArray(slackConfig.postingSlackWebHook) && slackConfig.postingSlackWebHook.length > 0)
    {
        for(var i = 0; i < slackConfig.postingSlackWebHook.length; i++)
        {
            var curHook = slackConfig.postingSlackWebHook[i].hook;
            var curURL = slackConfig.postingSlackWebHook[i].hookUrl;
            
            console.log('Post Hook: ' + curHook + ', ' + curURL);
            
            request({
                url: curURL,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: payload
              },
              function(error,response,body) {
                console.log('Hook "' + curHook + '" Response: ');
                if(error) {
                    console.log('error:');
                    console.log(error);
                }
                console.log(body);
            });
        }
    }
    
});

