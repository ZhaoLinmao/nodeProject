var express = require('express');
var router = express.Router();
var wechat = require("node-wechat");

/* 登录 */
router.post('/', function(req, res, next) {
    wechat.token = "tk328517snowforest";

    //监听文本信息
    wechat.text(function (data) {
        //console.log(data.ToUserName);
        //console.log(data.FromUserName);
        //console.log(data.CreateTime);
        //console.log(data.MsgType);
        //...
        var msg = {
            FromUserName : data.ToUserName,
            ToUserName : data.FromUserName,
            //MsgType : "text",
            Content : "这是文本回复",
            //FuncFlag : 0
        }
        //回复信息
        wechat.send(msg);
    });
});

module.exports = router;
