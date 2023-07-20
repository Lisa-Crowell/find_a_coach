import {createRouter, createWebHistory} from "vue-router";

import CoachDetail from './pages/coaches/CoachDetails.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuthentication from "@/pages/auth/UserAuthentication.vue";
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachList },
        { path: '/coaches/:id',
            component: CoachDetail,
            props:true,
            children: [
            { path: 'contact', component: ContactCoach }
            ]
        }, // /coaches/coachId/contact
        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuthentication, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound},
    ],
});
router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;