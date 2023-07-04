import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state() {
        return {
            userIsCoach: false,
            coaches: [
                {
                    id: 'c1',
                    firstName: 'Timothy',
                    lastName: 'Ricks',
                    areas: ['frontend', 'backend', 'career'],
                    description: 'I am a full-stack developer with 10 years of experience. I love to share my knowledge with other people and help them achieve their goals.',
                    hourlyRate: 35
                },
                {
                    id: 'c2',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    areas: ['frontend', 'career'],
                    description: 'I am a senior DevOps engineer that loves to share my knowledge with other people and help them achieve their goals.',
                    hourlyRate: 50
                },
                {
                    id: 'c3',
                    firstName: 'Robert',
                    lastName: 'Jones',
                    areas: ['backend', 'career'],
                    description: 'I am a senior backend engineer with 15 years of experience. It is a passion of mine to share ' +
                        'my knowledge with people and help them attain their next level.',
                    hourlyRate: 60
                }
            ]
        }
    },
    actions: actions,
    getters: getters,
    mutations: mutations,
};