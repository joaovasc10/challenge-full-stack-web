import { createRouter, createWebHistory } from 'vue-router';
import AlunoGrid from '../components/AlunoGrid.vue'
import Login from '../components/LoginAdmin.vue';
import Register from '../components/RegisterAdmin.vue';
import CreateAluno from '@/components/CreateAluno.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/alunos', name: 'AlunoGrid', component: AlunoGrid },
  { path: '/alunos/create', name: 'CreateAluno', component: CreateAluno },
  { path: '/alunos/edit/:id', name:'EditAluno', component: CreateAluno },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para proteger as rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name === 'AlunoGrid' && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;