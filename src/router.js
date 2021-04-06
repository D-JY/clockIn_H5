import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'vant'
import { getQueryString, getCode } from './utils'
import { getWeixinUserInfo } from './services/weixin'

Vue.use(Router)

const index = () => import('./pages/index')

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: '智能提醒'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const { meta: { title } = {} } = to
    console.log(to)
    if (title) document.title = title
    const token = localStorage.getItem('token')
    if (token) { // 有token不跳转授权
        next()
    } else {
        const code = getQueryString('code')
        // url没有code跳转微信授权页面获取code
        if (!code) {
            getCode()
            return
        } else {
            // 拿code获取openid
            getWeixinUserInfo({ code }).then(data => {
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    next()
                } else {
                    Toast.fail(data.message)
                }
            }).catch((err) => {
                Toast.fail(JSON.stringify(err))
            })
        }
    }
})

export default router
