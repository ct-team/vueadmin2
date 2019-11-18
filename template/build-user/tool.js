var path = require('path');
var glob = require('glob');
var root = path.resolve(__dirname, '../src/view/');

var getMulu = function(filePath) {
    var filename1 = filePath.substring(0, filePath.lastIndexOf('/'));
    var filename2 = filename1.substring(filename1.lastIndexOf('/') + 1);

    return filename2;
};

module.exports.getPages = function() {
    var entryFiles = glob.sync(root + '/*/main.js');
    var map = {};

    entryFiles.forEach(filePath => {
        var filename = getMulu(filePath);

        //map[filename] = entryRoot + filename + '/main.js';
        map[filename] = {
            // page 的入口
            entry: `src/view/${filename}/main.js`,
            // 模板来源
            template: `public/view/${filename}/index.ejs`,
            // 在 dist/index.html 的输出
            filename: `dest/${filename}.html`,
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', filename],
            inject: false
        };
    });
    console.log(root + '/*/main.js');
    console.log(entryFiles);
    return map;
};
