const mongoose = require('mongoose') 
// 链接mongo 并且使用recruit这个集合(没有会自动新建)
const DB_URL = 'mongodb://127.0.0.1:27017/recruit'
mongoose.connect(DB_URL)