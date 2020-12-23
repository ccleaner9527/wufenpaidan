module.exports = {
    runtimeCompiler:true,
    devServer: {
        open: true,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {  //配置跨域
            '/': {
                target: 'http://192.168.31.201:8080',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/': ''  //请求的时候使用这个api就可以
                }
            }
        }
    }
}