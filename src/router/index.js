// 创建路由文件
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			component: Home,
			children: [{
					path: '/',
					name: 'welcome',
					component: Welcome
				},
				{
					path: '/article',
					name: 'article',
					component: Article
				},
				{
					path: '/image',
					name: 'image',
					component: Image
				}
			]
		},
		{
			path: '*',
			name: '404',
			component: NotFound
		}
	]
})
// 注册一个全局的前置导航守卫
router.beforeEach((to, from, next) => {
	const user = window.sessionStorage.getItem('hm73-toutiao')
	if (to.path !== '/login' && !user) return next('/login')
	next()
})
export default router
