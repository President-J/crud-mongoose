var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var app = express()
//开放node_module文件目录
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
//配置模板引擎
app.engine('html',require('express-art-template'))
//配置模板引擎和body-parser一定要在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())
//把路由容器挂载到app服务中
app.use(router)
app.listen(3000,function(){
    console.log('runing 3000....')
})
module.exports = app;