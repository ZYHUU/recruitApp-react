const express = require('express')
const bodyPaeser = require('body-parser')
const cookiePaeser = require('cookie-parser')
const userRouter = require('./user')

const app = express()
// 可以解析cookie
app.use(cookiePaeser())
// 可以解析post请求传过来的json格式参数
app.use(bodyPaeser.json())
app.use('/user',userRouter)
app.listen(9093,function(){
    console.log('Node app start at prot 9093')
})