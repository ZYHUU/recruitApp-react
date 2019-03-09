const express = require("express");
const Router = express.Router();
const model = require("./model");
const utils = require("utility");
const User = model.getModel("user");
const _filter = { pwd: 0, __v: 0 };

Router.get("/list", function(req, res) {
  // User.remove({}, function(err,doc){})
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

Router.post('/update', function (req,res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  const body = req.body
  // findByIdAndUpdate 根据id查找并更新
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})

Router.post("/login", function(req, res) {
  // 获取请求入参
  const { user, pwd } = req.body;
  //_filter 接口返回数据中不展示的字段
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或密码错误" });
    }
    res.cookie("userid", doc._id);
    return res.json({ code: 0, data: doc });
  });
});

Router.post("/register", function(req, res) {
  console.log(req.body);
  // 获取请求入参
  const { user, pwd, type } = req.body;
  // 先在数据库查找用户是否存在
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" });
    }
    // 用户名不存在则执行创建操作
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: "后端出错了" });
      }
      const { user, type, _id } = doc;
      res.cookie("userid", _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});
Router.get("/info", function(req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

// 实现多重加密
function md5Pwd(pwd) {
  const salt = "zyh_is_rmm_4324x322!@UHb-FE~";
  return utils.md5(utils.md5(pwd + salt));
}

// CommonJS 暴露目标
module.exports = Router;
