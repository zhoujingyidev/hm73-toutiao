import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
import MyImage from '@/components/my-image.vue'

export default {
    install (Vue) {
        Vue.component(MyBread.name,MyBread)
        Vue.component(MyChannel.name,MyChannel)
        Vue.component(MyImage.name,MyImage)
    }
}