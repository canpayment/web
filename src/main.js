import Vue from 'vue'
import App from './App.vue'
import 'at-ui-style'
import AtUI from 'at-ui'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import New from './New.vue'
import Home from './Home.vue'
import Address from './Address.vue'
import Send from './Send.vue'
import IssueInvoice from './IssueInvoice.vue'
import Invoice from './Invoice.vue'
import Jpy from './Jpy.vue'

import './default.css'
Vue.use(AtUI)
Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect:'/new'},
    {path:"/new",component:New},
    {path:"/home",component:Home},
    {path:"/address/:address",component:Address,props:true},
    {path:"/send/:currency",component:Send,props:true},
    {path:"/issueInvoice",component:IssueInvoice},
    {path:"/jpy",component:Jpy},
    {path:"/invoice/:id",component:Invoice,props:true}
  ]
})

new Vue({
  el: '#app',
  ...App,

  router
})
