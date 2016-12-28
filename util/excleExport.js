/**
 * Created by zlm on 2016/12/22.
 */
var fs = require('fs');
var xlsx = require('node-xlsx');

/**
 * excle 导出
 * function (path,data,title){}
 * path 文件写入路径                "D://d.xslx"
 * data为多个或单个sheet的数据      [{name:sheet1,data:data1},{name:sheet2,data:data2}]
 *                                  name：为对应sheet的名称 "sheet1"
 *                                  data：为对应sheet的数据 [{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}]
 * title:为表头，并对应数据数据     {"a":"名称","b":"个数","c":"单位","d":"总数"}
 * 只有title对应的数据才能够显示
 * 如果对应错误该列将不显示
 * eg：var data = [{name:"第一个",data:[{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}]},
 *                 {name:"第二个",data:[{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}]}],
 *         title = [{"a":"名称","b":"个数","c":"单位","d":"总数"},{"a":"名称1","b":"个数1","c":"单位1","d":"总数1"}];
 *         excleExport("D://d.xslx",data,title);
 */
// excle 文件导出
var ExcleExport = function (path,data,title) {
    var excleAllData = [];


    //excle导出数据组织
    for(var obj in data){
        var excleData = {};
        //每一个sheet也的名称
        excleData.name = data[obj].name;
        excleData.data = [];
        //content为存储表头数组
        var content = [],
             head = [],
             tt = title[obj],//每一个表头object数据
             dd = data[obj].data;//每一个data数据
        //组织每一个sheet页的表头 {"a":"名称","b":"个数","c":"单位","d":"总数"}
        for(var _tt in tt){
            //组织每一个sheet页下的表头
            head.push(_tt);
            content.push(tt[_tt]);
        }
        //excleData为每一个sheet也中的数据
        excleData.data.push(content);
        //组织每一个sheet页中的数据 [{a:1,b:2,c:1,d:2},{a:2,b:3,c:4,d:5},{a:5,b:6,c:7,d:8}]
        for(var _dd in dd){
            var _dobj = dd[_dd],//取出数组中一个object {a:1,b:2,c:1,d:2}
                contentData = [];
                for(var dobj in _dobj){
                if(head.indexOf(dobj)>-1){
                    contentData.push(_dobj[dobj]);
                }
            }
            excleData.data.push(contentData);
        }
        excleAllData.push(excleData);
    }

    var buffer = xlsx.build(excleAllData);
    //二进制写文件
    fs.writeFileSync(path, buffer, 'binary');
};

module.exports = ExcleExport;