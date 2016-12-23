/**
 * Created by zlm on 2016/12/22.
 */

var Middleware = function (req,res,next) {
    var reg=new RegExp("assets");
    if((req.method=="GET"&&!reg.test(req.originalUrl))||req.session==null){
        if(req.originalUrl!="/login"&&req.session!=null){
            res.render('index', { title: '捷点科技' });
        }else{
            res.render('login')
        }
    }else{
        next();
    }
};

module.exports = Middleware;