var express = require('express');
var router = express.Router();
var wechat = require("../util/util")("tk328517snowforest");
var xmlparser = require("express-xml-bodyparser");

/* 微信用户传来的数据 一定要进行xml 拦截 nodejs 不能直接解析xml */
router.post('/',xmlparser({trim:false}), function(req, res, next) {
    var msg={},data={};
    try {
        data = wechat.getData(req.body.xml);

        //链式监听
        switch(data.MsgType){
            case "text":
                msg = {
                    FromUserName: data.ToUserName,
                    ToUserName: data.FromUserName,
                    Title: "宋冬野",
                    Description: "宋冬野——摩登天空7",
                    MsgType: "text",
                    Content:"这是一句话！"
                };
                break;
            case "image":
                msg = {
                    FromUserName: data.ToUserName,
                    ToUserName: data.FromUserName,
                    Title: "宋冬野",
                    Description: "宋冬野——摩登天空7",
                    MsgType: "text",
                    Content:"这是一个图片！"
                };
                break;
            case "location":
                msg = {
                    FromUserName: data.ToUserName,
                    ToUserName: data.FromUserName,
                    Title: "宋冬野",
                    Description: "宋冬野——摩登天空7",
                    MsgType: "text",
                    Content:"这是一个位置信息！"
                };
                break;
            case "link":
                msg = {
                    FromUserName: data.ToUserName,
                    ToUserName: data.FromUserName,
                    Title: "宋冬野",
                    Description: "宋冬野——摩登天空7",
                    MsgType: "text",
                    Content:"这是一个链接！"
                };
                break;
            case "event":
                if(data.EventKey =="V1001_TODAY_INTRODUCTION"){
                    msg = {
                        FromUserName: data.ToUserName,
                        ToUserName: data.FromUserName,
                        Title: "微信平台",
                        Description: "这是一个事件测试接口",
                        MsgType: "text",
                        Content:"这个测试就是说明你点击这个按钮，我可以给你发送我自定义的信息给你参考！"
                    };
                }
                break;
            case "voice":
                msg = {
                    FromUserName: data.ToUserName,
                    ToUserName: data.FromUserName,
                    Title: "宋冬野",
                    Description: "宋冬野——摩登天空7",
                    MsgType: "text",
                    Content:"这是一个音频！"
                };
                break;
            case "video":
                msg = {
                    FromUserName: data.ToUserName,
                    ToUserName: data.FromUserName,
                    Title: "宋冬野",
                    Description: "宋冬野——摩登天空7",
                    MsgType: "text",
                    Content:"这是一个视频！"
                };
                break;
        }
        res.send(wechat.toXml(msg));
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
