const express = require('express')
const bodyPaeser = require('body-parser')
const cookiePaeser = require('cookie-parser')
const app = express()
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket){
    console.log('user login')
    socket.on('sendmsg', function(data){
        console.log(data)
    })
})

const userRouter = require('./user')


// 可以解析cookie
app.use(cookiePaeser())
// 可以解析post请求传过来的json格式参数
app.use(bodyPaeser.json())
app.use('/user',userRouter)
app.listen(9093,function(){
    console.log('Node app start at prot 9093')
})