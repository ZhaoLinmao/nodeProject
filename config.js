/**
 * Created by zlm on 2016/12/26.
 */
var fs = require("fs");
var configFs= JSON.parse(fs.readFileSync('./config.json'));
var config = {};

//web 地址端口定义
config.webServerHost = configFs.webServer.host;
config.webServerPort = configFs.webServer.port;
//tcp 地址端口定义
config.tcpServerHost = configFs.tcpServer.host;
config.tcpServerPort = configFs.tcpServer.port;
//udp 地址端口定义
config.udpServerHost = configFs.udpServer.host;
config.udpServerPort = configFs.udpServer.port;
config.udpServerSendHost = configFs.udpServer.serverHost;
config.udpServerSendPort = configFs.udpServer.serverPort;
//文件上传路径
config.filePath = configFs.system.filePath;

module.exports = config;