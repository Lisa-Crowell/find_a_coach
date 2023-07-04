export default {
    registerCoach(context, data) {
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            areas: data.areas,
            description: data.description,
            hourlyRate: data.hourlyRate
        };
        context.commit('registerCoach', coachData);
    }
}