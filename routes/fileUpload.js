var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* POST users listing. */
router.post('/', function(req, res, next) {
  res.render('fileUpload');
});

/* POST users listing. */
router.post('/add', function(req, res, next) {
  var form  = new formidable.IncomingForm();
       form.encoding = 'utf-8';		//设置编辑
       form.uploadDir = 'fileupload';	 //设置上传目录
       form.keepExtensions = true;	 //保留后缀
       form.maxFieldsSize = 20 * 1024 * 1024;   //文件大小

      form.parse(req, function(err, fields, files) {
        fs.renameSync(files.file.path,files.file.name);
      });
      res.json(200);
});

module.exports = router;
