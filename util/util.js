/**
 * Created by zlm on 2016/12/26.
 */

var Util = function(token){
    if (!(this instanceof Util)) {
        return new Util(token);
    }
};

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
Util.prototype.toXml = function(data) {
    //自动检测 MsgType
    var MsgType = "";
    if (!data.MsgType) {
        if (data.hasOwnProperty("Content")) MsgType = "text";
        if (data.hasOwnProperty("MusicUrl")) MsgType = "music";
        if (data.hasOwnProperty("Articles")) MsgType = "news";
    } else {
        MsgType = data.MsgType;
    }

    var msg = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + data.ToUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + data.FromUserName + "]]></FromUserName>" +
        "<CreateTime>" + Date.now()/1000 + "</CreateTime>" +
        "<MsgType><![CDATA[" + MsgType + "]]></MsgType>";

    switch(MsgType) {
        case 'text' :
            msg += "" +
                "<Content><![CDATA[" + (data.Content || '') + "]]></Content>" +
                "</xml>";
            return msg;

        case 'image' :
            msg += "" +
                "<Image>" +
                "<MediaId><![CDATA[" + data.MediaId +"]]></MediaId>" +
                "</Image>" +
                "</xml>";

        case 'voice' :
            msg += "" +
                "<Voice>" +
                "<MediaId><![CDATA[" + data.MediaId +"]]></MediaId>" +
                "<Title><![CDATA[" + data.Title +"]]></Title>" +
                "<Description><![CDATA[" + data.Description +"]]></Description>" +
                "</Voice>" +
                "</xml>";

        case 'video' :
            msg += "" +
                "<Video>" +
                "<MediaId><![CDATA[" + data.MediaId +"]]></MediaId>" +
                "</Video>" +
                "</xml>";

        case 'music' :
            msg += "" +
                "<Music>" +
                "<Title><![CDATA[" + (data.Title || '') + "]]></Title>" +
                "<Description><![CDATA[" + (data.Description || '') + "]]></Description>" +
                "<MusicUrl><![CDATA[" + (data.MusicUrl || '') + "]]></MusicUrl>" +
                "<HQMusicUrl><![CDATA[" + (data.HQMusicUrl || data.MusicUrl || '') + "]]></HQMusicUrl>" +
                "<ThumbMediaId><![CDATA[" + (data.ThumbMediaId || '') + "]]></ThumbMediaId>" +
                "</Music>" +
                "</xml>";
            return msg;

        case 'news' :
            var ArticlesStr = "";
            var ArticleCount = data.Articles.length;
            for (var i in data.Articles) {
                ArticlesStr += "" +
                    "<item>" +
                    "<Title><![CDATA[" + (data.Articles[i].Title || '') + "]]></Title>" +
                    "<Description><![CDATA[" + (data.Articles[i].Description || '') + "]]></Description>" +
                    "<PicUrl><![CDATA[" + (data.Articles[i].PicUrl || '') + "]]></PicUrl>" +
                    "<Url><![CDATA[" + (data.Articles[i].Url ||'') + "]]></Url>" +
                    "</item>";
            }

            msg += "<ArticleCount>" + ArticleCount + "</ArticleCount><Articles>" + ArticlesStr + "</Articles></xml>";
            return msg;
    }
};


Util.prototype.getData = function (data){
    var msg = {};
    msg.ToUserName = data.tousername[0];
    msg.FromUserName = data.fromusername[0];
    msg.CreateTime = data.createtime[0];
    msg.MsgType = data.msgtype[0];

    switch(msg.MsgType) {
        case 'text' :
            msg.Content = data.content[0];
            msg.MsgId = data.msgid[0];
            break;

        case 'image' :
            msg.PicUrl = data.picurl[0];
            msg.MsgId = data.msgid[0];
            msg.MediaId = data.mediaid[0];
            break;

        case 'voice' :
            msg.MediaId = data.mediaid[0];
            msg.Format = data.format[0];
            msg.MsgId = data.msgid[0];
            break;

        case 'video' :
            msg.MediaId = data.mediaid[0];
            msg.ThumbMediaId = data.thumbmediaid[0];
            msg.MsgId = data.msgId[0];
            break;

        case 'location' :
            msg.Location_X = data.location_x[0];
            msg.Location_Y = data.location_x[0];
            msg.Scale = data.scale[0];
            msg.Label = data.label[0];
            msg.MsgId = data.msgId[0];
            break;

        case 'link' :
            msg.Title = data.title[0];
            msg.Description = data.description[0];
            msg.Url = data.url[0];
            msg.MsgId = data.msgId[0];
            break;

        case 'event' :
            msg.Event = data.event[0];
            msg.EventKey = data.eventkey[0];
            break;
    }
    return msg;
};

module.exports = Util;



