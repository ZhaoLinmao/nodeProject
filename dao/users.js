/**
 * Created by zlm on 2016/12/22.
 */
var Users = function (req,res,next){
    this.username = req.body.username||"";
    this.password = req.body.password||"";
};

var conn = require("../conf/mysql/db");

Users.prototype.login = function(params,callback){
    var sql = "select * from admin where username = ?";
    conn.query(sql,[params.username],function(err,rows,fileds){
        var result = {};
        result.status = "FAILURE";
        if(err){
            console.log(err);
            result.msg = err;
        }else{
            if(rows.length===0){
                result.msg = "该用户不存在!";
            }else if(params.password!=rows[0].password){
                result.msg = "密码错误!"
            }else{
                result.status = "SUCCEED";
                result.msg = rows[0];
                req.session.user = rows[0];
            }
            console.log(result)
            callback(result);
        }
    });
};

module.exports = Users;