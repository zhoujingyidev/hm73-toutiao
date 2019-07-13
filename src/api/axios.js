// 封装axios
import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://ttapi.research.itcast.cn/mp/v1_0/',
    headers : {
        //token 认证需要的字段 值：注意需要加上前缀‘Bearer’
        Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('hm73-toutiao')).token
      }
})

export default instance