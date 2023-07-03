import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/index.vue'
import PictureView from '@/views/PictureView/index.vue'
import AboutView from '@/views/AboutView/index.vue'
import BlogView from '@/views/BlogView/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: HomeView
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/picture',
            name: 'picture',
            component: PictureView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/post/:postId',
            name: 'post',
            component: BlogView
        },
    ]
})

export default router
