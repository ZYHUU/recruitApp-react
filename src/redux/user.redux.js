import axios from "axios";
import {
	getRedirectPath
} from '../util'

const	AUTH_SUCCESS = 'AUTH_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
	redirectTo: '', // 跳转路径
	msg: '', // 提示信息
	user: '',
	pwd: '',
	type: ''
}

// reducer
export function user(state = initState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				msg: '',
				redirectTo: getRedirectPath(action.payload),
				...action.payload
			}
		case LOAD_DATA:
			return {
				...state,
				...action.payload
			}
		case ERROR_MSG:
			return {
				...state,
				isAuth: false,
				msg: action.msg
			}
		default:
			return state
	}
}

function authSuccess(data) {
	return {
		type: AUTH_SUCCESS,
		payload: data
	}
}

// function loginSuccess(data) {
// 	return {
// 		type: LOGIN_SUCCESS,
// 		payload: data
// 	}
// }

// function registerSuccess(data) {
// 	return {
// 		type: REGISTER_SUCCESS,
// 		payload: data
// 	}
// }

function errorMsg(msg) {
	return {
		msg,
		type: ERROR_MSG
	}
}

export function loadData(userinfo) {
	return {
		type: LOAD_DATA,
		payload: userinfo
	}

}


// 登录
export function login({
	user,
	pwd
}) {
	if (!user || !pwd) {
		return errorMsg('用户名密码必须输入')
	}
	return dispatch => {
		axios.post('/user/login', {
				user,
				pwd
			})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}


// 注册
export function register({
	user,
	pwd,
	repeatpwd,
	type
}) {
	if (!user || !pwd || !type) {
		return errorMsg('用户名密码必须输入')
	}
	if (pwd !== repeatpwd) {
		return errorMsg('输入密码不一致')
	}
	// redux-thunk支持返回函数写法(解决异步)
	return dispatch => {
		axios.post('/user/register', {
				user,
				pwd,
				type
			})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess({
						user,
						pwd,
						type
					}))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

// 信息完善
export function update(data) {
	return dispatch => {
		axios.post('/user/update',data)
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
		})
	}
}