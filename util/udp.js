/**
 * Created by zlm on 2016/12/26.
 */
var dgram = require('dgram');

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
var udp = function(PORT,HOST,SERVERPORT,SERVERHOST){

    var server = dgram.createSocket("udp4");

    server.on("message",function(msg,rinfo) {

        var message=new Buffer("string");
        var client=dgram.createSocket("udp4");
        client.send(message,0,message.length,SERVERPORT,SERVERHOST,function(err,bytes){
            client.close();
        });

        console.log("Server got: "+msg+" from "+rinfo.address+":"+rinfo.port);
    });

    server.on("listening",function() {
        var address = server.address();
        console.log("udp Server listening on "+ HOST +":"+address.port);
    });

    server.bind(PORT);
};

module.exports = udp;



