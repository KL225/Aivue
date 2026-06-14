import { createRouter, createWebHistory} from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import FrontendLayout from '@/components/FrontendLayout.vue'

// 路由配置
const backendRoutes = [
    {
        path: '/back',
        redirect: '/back/bashboard',
        component: BackendLayout,
        children: [
            {
                path:'bashboard',
                component: () => import('@/views/bashboard.vue'),
                meta:{
                    title:'数据分析',
                    icon:'PieChart',
                }
            },
            {
                path:'knowledge',
                component:() => import('@/views/knowledge.vue'),
                meta:{
                    title:'知识文章',
                    icon:'ChatLineSquare',
                }
            },
            {
                path:'consultations',
                component:() => import('@/views/consultations.vue'),
                meta:{
                    title:'咨询记录',
                    icon:'Message',
                }
            },
            {
                path:'emotional',
                component:() => import('@/views/emotional.vue'),
                meta:{
                    title:'情绪日志',
                    icon:'User',
                }
            }
        ]
    },
    {
        path:'/auth',
        component: () => import('@/components/AuthLayout.vue'),
        children:[
            {
                path:'login',
                component:() => import('@/views/login.vue'),
                meta:{
                    title:'登录',
                }
            },
            {
                path:'register',
                component:() => import('@/views/register.vue'),
                meta:{
                    title:'注册',
                }
            }
        ]
    }
]

const frontendRoutes = [
    {
        path:'/',
        component: FrontendLayout,
        children:[
            {
                path: '/',
                component:() => import('@/views/home.vue'),
            },
            {
                path: '/consultation',
                component:() => import('@/views/consultation.vue'),
            },
            {
                path: '/emotion-diary',
                component:() => import('@/views/emotionDiary.vue'),
            },
            {
                path: '/frontendknowledge',
                component:() => import('@/views/frontendknowledge.vue')
            },
        ]
    }]

const router = createRouter({
    // 路由模式
    history: createWebHistory(),
    // 路由配置
    routes: [...backendRoutes, ...frontendRoutes]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (token) {
        // 如果是后台用户
        if (userInfo.userType === 2) {
            if (to.path.startsWith('/back')) {
                next()
            } else {
                next( '/back/bashboard' )
            }
        } else if (userInfo.userType === 1) {
            // 用户端的账号只能访问前台路由
            if (to.path.startsWith('/back') || to.path.startsWith('/auth')) {
                next('/')
            } else {
                next()
            }
        }
    } else {
        if (to.path.startsWith('/back')) {
            // 如果是访问后台页面，那么跳转到登录页
            next( '/auth/login' )
        } else {
            next()
        }
    }
})

export default router