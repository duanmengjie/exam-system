import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios

axios.defaults.headers.common['token'] = localStorage.getItem("token");

Vue.config.productionTip = false
Vue.use(ElementUI);





new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})