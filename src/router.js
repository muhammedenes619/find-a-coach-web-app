import { createRouter, createWebHistory } from 'vue-router';
//import Full page components from coaches
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesRegisteration from './pages/coaches/CoachRegisteration.vue';
//import Full page components from requests
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecieved from './pages/requests/RequestRecieved.vue';
import UserAuth from './pages/auth/UserAuth.vue';
//import not found component form pages
import NotFound from './pages/NotFound.vue';

import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      props: true,
      path: '/coaches/:id',
      component: CoachDetails,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    {
      path: '/register',
      component: CoachesRegisteration,
      meta: { requireAuth: true },
    },
    {
      path: '/requests',
      component: RequestsRecieved,
      meta: { requireAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { noRequiredAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});
router.beforeEach(function (to, _, next) {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.noRequiredAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
