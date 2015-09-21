var express = require('express');
var bodyParser = require('body-parser');
var inspire = require('./inspire.js');
var slackConfig = require('./slackconfig.js');

var app = express();

var port = process.env.PORT || 3000;

console.log(slackConfig.incomingSlackToken);

app.use(bodyParser.urlencoded({ extended: false }));

function isValidToken(token)
{
    var ret = false;
    if(token && token.length > 0 && slackConfig.incomingSlackToken && Array.isArray(slackConfig.incomingSlackToken) && slackConfig.incomingSlackToken.length > 0)
    {
        for(var i = 0 ; i < slackConfig.incomingSlackToken.length ; i++ )
        {
            if(token === slackConfig.incomingSlackToken[i].hookToken)
            {
                ret = true;
                break;
            }
        }
    } else { 
        console.log('not a valid token: (' + token + ',' + Array.isArray(slackConfig.incomingSlackToken) + ',' + slackConfig.incomingSlackToken + ')') 
    }
    return ret;
}
function isValidTriggerWord(triggerWord)
{
    var ret = triggerWord === 'inspireme' || triggerWord === ':inspireme';
    return ret;
}

app.use('/inspireme',function(req,res,next) {
    console.log('inspireme:');
    var reqToken = req.body.token;
    var reqTriggerWord = req.body.trigger_word;
    
    if(isValidToken(reqToken) && isValidTriggerWord(reqTriggerWord))
    {
        inspire.getQuote(function(quote) {
            console.log(quote);
            var payload = {
                "text": "*" + quote.quote + "* - _" + quote.author + "_",
                "icon_emoji": ":sunny:"
            };
            res.json(payload);
            next();
        });
    }
    else
    { 
        var payload = {
            "text": "You say you want me to inspire you, but you haven't used the magic phrase and/or password."
        };
        res.json(payload);
        next();
    }
});

app.listen(port, function() {
	console.log('Running on port: ' + port);
});
