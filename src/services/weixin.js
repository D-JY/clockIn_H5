import request from '../utils/request'

export function getOpenId(params) {
    return request('/weixin/getOpenId', {
        method: 'get',
        params
    })
}
