export function getRedirectPath({type, avatar}) {
    // 根据用户信息 返回跳转路径

    // 判断用户类型
    let url = (type === 'boss') ? '/boss' : '/genius'
    // 信息是否完善
    if (!avatar) {
        url += 'info'
    }
    return url
}