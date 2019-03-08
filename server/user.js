const express = require('express')
const Router = express.Router()
const model = require('./model')
const utils = require('utility')
const User = model.getModel('user')

Router.get('/list', function (req, res) {
    // User.remove({}, function(err,doc){})
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
})

Router.post('/login', function(req, res) {
    // 获取请求入参
    const { user, pwd } = req.body
    User.findOne({user, pwd:md5Pwd(pwd)},function(err, doc) {
        if(!doc) {
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        return res.json({code:0,data:doc})
    })
})

Router.post('/register', function (req, res) {
    console.log(req.body)
    // 获取请求入参
    const { user, pwd, type } = req.body
    // 先在数据库查找用户是否存在
    User.findOne({ user }, function (err, doc) {
        if (doc) {
            return res.json({code:1,msg:'用户名重复'})
        }
        // 用户名不存在则执行创建操作
        User.create({ user, pwd:md5Pwd(pwd), type }, function (err, doc) {
            if (err) {
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })
})
Router.get('/info', function (req, res) {
    return res.json({code:1})
})

// 实现多重加密
function md5Pwd(pwd) {
    const salt = 'zyh_is_rmm_4324x322!@UHb-FE~'
    return  utils.md5(utils.md5(pwd+salt))
}

// CommonJS 暴露目标
module.exports = Router