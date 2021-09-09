import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import CourseDetail from '../components/CourseDetail.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/courseDetail',
        name: 'CourseDetail',
        component: CourseDetail,
    }
]

const router = new VueRouter({
    routes
})

export default router