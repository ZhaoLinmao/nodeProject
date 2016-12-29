var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var xlsx = require('node-xlsx');
var config = require('../config');
var excleExport = require('../util/excleExport');
var sendEmail = require('../util/sendEmail');
/* POST users listing. */
router.post('/', function(req, res, next) {
  res.render('fileUpload');
});

/* POST users listing. */
router.post('/add', function(req, res, next) {
  var form  = new formidable.IncomingForm();
       form.encoding = 'utf-8';		//设置编辑
       form.uploadDir = config.filePath;	 //设置上传目录
       form.keepExtensions = true;	 //保留后缀
       form.maxFieldsSize = 20 * 1024 * 1024;   //文件大小

      form.parse(req, function(err, fields, files) {
          var newFile = config.filePath+'/'+new Date().getTime()+"-"+files.file.name;
          fs.renameSync(files.file.path,newFile);
          sendEmail();
          //excle 导入、导出
          //首先判断是否为excle文件 进行文件导入
          if(files.file.name.indexOf("xlsx")>0||files.file.name.indexOf("xls")>0){
              //获取上传文件内容
              var workBook = xlsx.parse(fs.readFileSync(newFile));
              //对获取文件进行处理
              for(var sheet in workBook){
                  //sheet名称
                  var sheetName = workBook[sheet].name;
                  //console.log(sheetName);
                  //console.log(workBook[sheet].data);
                  //单个sheet文件进行 数据处理
                  //for(var data in workBook[sheet].data){
                      //TODO 进行数据处理 可存入数据库
                      //console.log(JSON.stringify(workBook[sheet].data[data]));
                  //}
                  /**
                   * excle 导出
                   * function (path,data,title){}
                   * path 文件写入路径                "D://d.xslx"
                   * data为多个或单个sheet的数据      [{name:sheet1,data:data1},{name:sheet2,data:data2}]
                   *                                  name：为对应sheet的名称 "sheet1"
                   *                                  data：为对应sheet的数据 [{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}]
                   * title:为表头，并对应数据数据     {"a":"名称","b":"个数","c":"单位","d":"总数"}
                   * 只有title对应的数据才能够显示  必须与sheet相对应
                   * 如果对应错误该列将不显示
                   * eg：var data = [{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}],
                   *         title = {"a":"名称","b":"个数","c":"单位","d":"总数"};
                   *         excleExport("D://d.xslx",data,title);
                   */
                  //var data = [{name:"第一个",data:[{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}]},
                  //              {name:"第二个",data:[{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}]}],
                  //     title = [{"a":"名称","b":"个数","c":"单位","d":"总数"},{"a":"名称1","b":"个数1","c":"单位1","d":"总数1"}];
                  //excleExport("D://d.xlsx",data,title);
              }
          }
      });
      res.json(200);
});

module.exports = router;
