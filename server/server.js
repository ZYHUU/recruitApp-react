const express = require('express')
const mongoose = require('mongoose') 

// 链接mongo 并且使用recruit这个集合(没有会自动新建)
const DB_URL = 'mongodb://127.0.0.1:27017/recruit'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
})

// 类似于mysql的表 mongo里有文档，字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: { type: String, require: true },
    age: {type:Number,require:true}
}))
// 新增数据
// User.create({
//     user: 'ls',
//     age:100
// }, function (err,doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         cosnole.log(err)
//     }
// })
// 新建app

// 删除数据
// User.remove({ age: 18 }, function (err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         cosnole.log(err)
//     }
// })

// 更新数据
User.update({ 'user': 'ls' }, { '$set': { age: 26 } }, function (err, doc) {
    if (!err) {
        console.log(doc)
    } else {
        cosnole.log(err)
    }
})
const app =  express()
app.get('/',function(req,res){
    res.send('<h1>Hello world</h1>')
})

// 查找操作 findOne 查找一条 find 查找所有 (后面对象内为所查条件)
app.get('/data',function(req,res){
    // res.json({name:'imoc',type:'it'})
    User.findOne({'user':'ls'}, function (err, doc) {
        res.json(doc)
    })
})

app.listen(9093,function(){
    console.log('Node app start at prot 9093')
})