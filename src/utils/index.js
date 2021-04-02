import { appid } from './const'
// 获取url查询参数
function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return unescape(r[2])
    }
    return null
}

// 跳转微信授权页面返回code
function getCode(state = 0) {
    const { href } = window.location
    const uri = encodeURIComponent(href)
    // location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
}

export {
    getQueryString,
    getCode
}
