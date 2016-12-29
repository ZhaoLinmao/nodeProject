/**
 * Created by zlm on 2016/12/22.
 */
var sha1 = require('sha1');

var Middleware = function (req,res,next) {
    var reg=new RegExp("assets");
    if((req.method=="GET"&&!reg.test(req.originalUrl))||req.session==null){
        if(req.originalUrl!="/login"&&req.session!=null){
            if(req.originalUrl.indexOf("check")>=0){
                var token="tk328517snowforest";//微信中配置token
                var signature = req.query.signature; //微信加密签名
                var nonce = req.query.nonce; //随机数
                var timestamp = req.query.timestamp; //时间戳
                var echostr = req.query.echostr; //随机字符串
                var str = [token, timestamp, nonce].sort().join('');//排序后进行拼装
                var sha = sha1(str);//进行sha1加密
                if(signature==sha){//验证
                    console.log("微信验证通过");
                    res.send(echostr);
                }else{
                    res.send("error");
                }
            }else{
                res.render('index', { title: '捷点科技' });
            }
        }else{
            res.render('login')
        }
    }else{
        next();
    }
};

module.exports = Middleware;