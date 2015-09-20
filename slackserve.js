var express = require('express');
var bodyParser = require('body-parser');
var inspire = require('./inspire.js');
var slackConfig = require('./slackconfig.js');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/inspireme',function(req,res,next) {
    console.log('inspireme:');
    var reqToken = req.body.token;
    var reqTriggerWord = req.body.trigger_word;
    
    if(reqToken === slackConfig.incomingSlackToken && (reqTriggerWord === 'inspireme' || reqTriggerWord === ':inspireme'))
    {
        inspire.getQuote(function(quote) {
            console.log(quote);
            var payload = {
                "text": "*" + quote.quote + "* - _" + quote.author + "_",
                "icon_emoji": ":sunrise:"
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
