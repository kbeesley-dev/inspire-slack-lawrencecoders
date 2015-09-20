module.exports = {
    escapeRegExp : function (string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },
    replaceAll : function (string, find, replace) {
      return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    },
    processJSONString : function (data)
    {
        var ret = data;

        //unescape single quotes
        ret = this.replaceAll(ret,"\'","'");
        return ret;
    }
};