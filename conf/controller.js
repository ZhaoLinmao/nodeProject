var index = require("../routes/index");
var login = require("../routes/login");
var fileUpload = require("../routes/fileUpload");
var three = require("../routes/three");
var check = require("../routes/check");

var Controller = function (){
    if(!(this instanceof Controller)){
        return new Controller();
    }
};

Controller.prototype.routes = function (app) {
    app.use('/index', index);
    app.use('/login', login);
    app.use('/upload', fileUpload);
    app.use('/three', three);
    app.use('/check', check);
};

module.exports = Controller;