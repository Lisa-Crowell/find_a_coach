import {createStore} from 'vuex';
import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index';
import authModule from './modules/auth/index';

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule,
    },
    state() {
        return {
            userId: new Date().toISOString()
        };
    },
});

export default store;