// basic setup
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Vue-awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
