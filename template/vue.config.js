const buildConfig = require('./build-user/config');
const buildTool = require('./build-user/tool');
const buildCopy = require('./build-user/copy');
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
    //lintOnSave: true,
    pages: buildTool.getPages(),
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: 'src/view/index/main.js',
    //         // 模板来源
    //         template: 'src/view/index/index.ejs',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     }
    // },

    outputDir: 'dist',
    assetsDir: 'assets',
    productionSourceMap: false,
    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）

        // 也可以是传递给 extract-text-webpack-plugin 的选项对象

        extract: IS_PROD, // 允许生成 CSS source maps?

        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }

        loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.

        requireModuleExtension: false
    },
    // 所有 webpack-dev-server 的选项都支持。
    devServer: buildConfig.devServer,
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT'
        };

        if (process.env.NODE_ENV === 'production') {
            config.plugins.push({
                apply: compilation => {
                    compilation.hooks.done.tap('succeedModule', compilation => {
                        buildCopy.init();
                    });
                }
            });
        }
    }
};
