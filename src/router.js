import {createRouter, createWebHistory} from "vue-router";

import CoachDetail from './pages/coaches/CoachDetails.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuthentication from "@/pages/auth/UserAuthentication.vue";

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
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestReceived },
        { path: '/auth', component: UserAuthentication},
        { path: '/:notFound(.*)', component: NotFound},
    ],
});

export default router;