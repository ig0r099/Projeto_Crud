import Vue from 'vue'
import VueRouter from 'vue-router'
import CadastroDependente from '../views/CadastroDependenteView.vue'
import JogadorView from '../views/JogadorView.vue'
import TimeView from '../views/TimeView.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/jogador',
    name: 'Jogador',
    component: JogadorView
  },
  {
    path: '/',
    name: 'Time',
    component: TimeView
  },
  {
    path: '/dependente',
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
