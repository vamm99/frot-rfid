import { createRouter, createWebHistory } from 'vue-router';
import RegistrarView from '../views/RegistrarView.vue';
import RegistrarSaldoView from '@/views/RegistrarSaldoView.vue';
import ActualizarView from '@/views/ActualizarView.vue';
import ListarView from '@/views/ListarView.vue';
import LoginView from '@/views/LoginView.vue';
import PuntosView from '@/views/PuntosView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/registrar',
      name: 'registrar',
      component: RegistrarView,
    },
    {
      path: '/recargar',
      name: 'recargar',
      component: RegistrarSaldoView,
    },
    {
      path: '/actualizar',
      name: 'actualizar',
      component: ActualizarView,
    },
    {
      path: '/listar',
      name: 'listar',
      component: ListarView,
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/puntos',
      name: 'puntos',
      component: PuntosView
    }
  ],
});

router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && !localStorage.getItem('token')){
    next({name: 'login'})
  } else {
    next();   
  }
})


export default router;
