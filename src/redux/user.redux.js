import axios from "axios";
import { getRedirectPath } from '../util'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const initState = {
    redirectTo: '', // 跳转路径
    isAuth: '', // 是否登录
    msg: '', // 提示信息
    user: '',
    pwd: '',
    type: ''
}

// reducer
export function user(state=initState,action) {
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOGIN_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        default:
            return state
    }
}

function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, payload: data}
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload:data}
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG }
}

// 登录
export function login({user, pwd}){
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {user,pwd})
            .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}


// 注册
export function register({user,pwd,repeatpwd,type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('输入密码不一致')
    }
    // redux-thunk支持返回函数写法(解决异步)
    return dispatch => {
        axios.post('/user/register', {user,pwd,type})
            .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(registerSuccess({user,pwd,type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
   
}