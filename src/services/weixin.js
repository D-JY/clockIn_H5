import request from '../utils/request'

export function getWeixinUserInfo(params) {
    return request('/weixinApi/getWeixinUserInfo', {
        method: 'get',
        params
    })
}
