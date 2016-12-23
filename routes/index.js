var express = require('express');
var router = express.Router();
var Users = require("../dao/Users");

/* 登录 */
router.post('/', function(req, res, next) {
    if(req.body.username==null||req.body.username==""){
        res.render('login',{error:"用户名不能为空!"});
    }else if(req.body.password==null||req.body.password==""){
        res.render('login',{error:"密码不能为空!"});
    }else{
        var user = new Users(req,res);
        user.login(user,function(result){
            if(result.status=="SUCCEED"){
                req.session.user = result.msg;
                res.render('index', { title: '捷点科技' });
            }else{
                res.render('login',{error:result});
            }
        });
    }
});

/* 获取数据 */
router.post('/data', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    var params = {};
        params.limit = req.body.limit||10;
        params.offset = req.body.offset||0;
    var cells = 16;
    var rows = params.limit;
    var data = [];
    var page = {};
    for (i = 0; i < rows; i++) {
        row = {};
        for (j = 0; j < cells; j++) {
          row['field' + j] = '行-' + params.offset+1 + '列-' + j;
        }
        data.push(row);
    }
    page.total = "128";
    page.rows = JSON.parse(JSON.stringify(data));
    res.send(page);
});

module.exports = router;
