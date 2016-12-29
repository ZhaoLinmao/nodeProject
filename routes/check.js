var express = require('express');
var router = express.Router();
var wx = require("weixin-api");

/* 登录 */
router.post('/', function(req, res, next) {
    wx.token = "tk328517snowforest";
    wx.textMsg(function(msg){
        console.log("响应用户文本消息");
        console.log(JSON.stringify(msg));
        var content = "消息内容："+ msg.content+"\n";
        content = content + "toUserName:" + msg.toUserName + "\n";
        content = content + "fromUserName:" + msg.fromUserName + "\n";
        var resMsg = {};
        resMsg = {
            fromUserName : msg.toUserName,
            toUserName : msg.fromUserName,
            msgType : "text",
            content : content,
            funcFlag : 0
        };
        wx.sendMsg(resMsg);
    });
});

module.exports = router;
