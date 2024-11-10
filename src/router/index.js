import { createRouter, createWebHistory } from 'vue-router'
import RegistrarView from '../views/RegistrarView.vue';
import RegistrarSaldoView from '@/views/RegistrarSaldoView.vue';
import ActualizarView from '@/views/ActualizarView.vue';
import ListarView from '@/views/ListarView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RegistrarSaldoView
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: RegistrarView,
    },
    {
      path: '/recargar',
      name: 'Recargar',
      component: RegistrarSaldoView,
    },
    {
      path: '/actualizar',
      name: 'Actualizar',
      component: ActualizarView

    },
    {
      path: '/listar',
      name: 'Listar',
      component: ListarView
    }

  ]
})

export default router
