import Vue from 'vue'
import Router from 'vue-router'

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
    if (title) document.title = title
    next()
})

export default router
