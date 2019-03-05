const express = require('express')
// 新建app
const app =  express()

app.get('/',function(req,res){
    res.send('<h1>Hello world</h1>')
})
app.get('/data',function(req,res){
    res.json({name:'imoc',type:'it'})
})

app.listen(9093,function(){
    console.log('Node app start at prot 9093')
})