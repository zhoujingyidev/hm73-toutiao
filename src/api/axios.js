// 封装axios
import axios from 'axios'
import JSONBig from 'json-bigint'

const instance = axios.create({
	baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
	// headers : {
	//     //token 认证需要的字段 值：注意需要加上前缀‘Bearer’
	//     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm73-toutiao')).token
	//   }
	transformResponse:[ (data) => {
		if (data) {
			return JSONBig.parse(data)
		}
		return data
	}]
})

// 请求拦截器
instance.interceptors.request.use(config => {
	const user = window.sessionStorage.getItem('hm73-toutiao')
	if (user) {
		config.headers = {
			Authorization: 'Bearer ' + JSON.parse(user).token
		}
	}
	return config
}, error => {
	return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
    return response
},(error) => {
    //如果响应状态码是 401 拦截到登录页面
    if(error.response.status === 401) {
        location.hash = '#/login'
    }
    return Promise.reject(error)
})




export default instance
