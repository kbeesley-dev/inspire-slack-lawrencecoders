function prepareEnvVar(envVar)
{
    var ret = envVar;
    
    console.log('prepareEnvVar');
    console.log(ret);
    if(ret.charAt(0) === "'" && ret.charAt(ret.length - 1) === "'")
    {
        ret = ret.substr(1,envVar.length - 2);
        console.log(ret);
    }
    
    ret = JSON.parse(ret);
    console.log(ret);
    
    return ret;
}

module.exports = {
    postingSlackWebHook: prepareEnvVar(process.env.SLACK_POSTINGWEBHOOK),
    incomingSlackToken: prepareEnvVar(process.env.SLACK_INCOMINGTOKEN)
};
