var index = require("../routes/index");
var login = require("../routes/login");
var fileUpload = require("../routes/fileUpload");

var Controller = function (){
    if(!(this instanceof Controller)){
        return new Controller();
    }
};

Controller.prototype.routes = function (app) {
    app.use('/index', index);
    app.use('/login', login);
    app.use('/upload', fileUpload);
};

module.exports = Controller;