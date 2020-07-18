import Vue from 'vue'
import App from './App.vue'
import chenAudio from '../packages/index'

Vue.use(chenAudio)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
