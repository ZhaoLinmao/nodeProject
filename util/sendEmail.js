/**
 * Created by zlm on 2016/12/22.
 */
var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var SendEmail = function (){
    var transport = mailer.createTransport(smtpTransport({
        host: 'smtp.126.com',
        secureConnection: true,
        port: 25,
        auth: {
            user: '***',
            pass: 'tokenlhxy714118'
        }
    }));

    transport.sendMail({
        from : "zhaolinmao@126.com",
        to : "121776554@qq.com",
        subject: "邮件主题",
        generateTextFromHTML : false,
        text : "这是封测试邮件"
    }, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        transport.close();
    });
};
module.exports = SendEmail;