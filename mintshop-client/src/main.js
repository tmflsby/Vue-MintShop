import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import {Button} from 'mint-ui'
import './mock/mockServer'
import './filters'
import VueLazyload from 'vue-lazyload'
// import loading from './assets/imgs/loading.gif'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper, /* { default global options } */)

fastClick.attach(document.body)

Vue.component(Button.name, Button)

Vue.use(VueLazyload, {
  loading: './assets/imgs/loading.gif'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
