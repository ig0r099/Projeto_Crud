import Vue from 'vue'
import VueRouter from 'vue-router'
import CadastroDependente from '../views/CadastroDependenteView.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'cadastrodependente',
    component: CadastroDependente
  },
  {
    path: '/funcionario',
    name: 'funcionario',
    
    component: () => import('../views/FuncionarioView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
