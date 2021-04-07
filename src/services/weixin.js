import request from '../utils/request'

// 获取微信用户信息
export function getWeixinUserInfo(params) {
    return request('/weixin/getWeixinUserInfo', {
        method: 'get',
        params
    })
}

// 获取接收人列表
export function userList() {
    return request('/weixin/userList', {
        method: 'get'
    })
}

// 发送模板消息
export function sendWeiXinMsg(params) {
    return request('/weixin/sendWeiXinMsg', {
        method: 'post',
        data: params
    })
}
