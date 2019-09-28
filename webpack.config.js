//webpackLearn的配置文件，其打包的入口和出口
const path = require('path')
//导入安装的html-webpack-plugin插件
const htmlWebpackPlugin=require('html-webpack-plugin')
//插件工具都需要放到plugins节点中进行配置

module.exports = {
    //入口文件
    entry: path.join(__dirname,'./web/vueApp/main.js'),//从根目录开始拼接的一个路径
    //出口哦
    output: {
        //输出的文件名
        filename: 'bundle.js',
        //输出的路径
        path: path.join(__dirname, './dist')
    },
    plugins: [//配置插件的节点
        new htmlWebpackPlugin({//创建一个在内存中生成HTML页面的插件
            template:path.join(__dirname,'./web/vueApp/index.html'),//指定模板页面根据指定页面的路径去生成存放在内存的页面
            filename: 'index.html'//指定在内存中生成的页面的名字
        })

    ],
    module: {//用来配置所有的第三方模块加载器
        rules: [//第三方模块的匹配规则
    //匹配处理，使用正则表达式匹配以css结尾的文件然后用对应的加载器去加载，加载器调用顺序从后向前，先css-loader再style-loader，将处理结果交给webpack打包合并到bundle.js中
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=40162'},
//处理图片路径的loader,limit限制图片大小单位Byte,超过limit大小URL地址不会被转为base64编码格式的字符串而是转成hash值字符串避免文件名重名，另一个参数&name=[hash:8]-[name].[ext]表示URL地址名字不变后缀名也不变，地址托管的路径默认位于根目录，文件名截取32位的hash值的前8位和图片文件本身的名字进行拼接避免出现相同名称的文件被覆盖的情况
            {test:/\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'},//处理字体文件
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//使用babel对JS的高级es6语法进行识别编译
            {test:/\.vue$/,use:'vue-loader'}
        ]

    }
};