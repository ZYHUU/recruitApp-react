const mongoose = require('mongoose') 
// 链接mongo 并且使用recruit这个集合(没有会自动新建)
const DB_URL = 'mongodb://127.0.0.1:27017/recruit-chat'
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': { 'type': String, 'require': true },
        'pwd': { 'type': String, 'require': true },
        'type': { 'type': String, 'require': true },
        // 头像
        'avatar': { 'type': String },
        // 个人简介或职位介绍
        'desc': { 'type': String },
        // 职位名
        'title': { 'type': String },
        // boss 另外另外两个字段
        // 公司
        'company': { 'type': String },
        // 岗位薪资
        'money':{'type':String}
    },
    chat: {
        
    }
}
for (let m in models) {
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}