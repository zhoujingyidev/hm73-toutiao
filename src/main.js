import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import axios from '@/api/axios'

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
// 职责1：依赖项目需要的资源（js模块，css资源）
// 职责2：实例化根实例 render() 渲染app组件，然后挂载到#app的容器内容
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
