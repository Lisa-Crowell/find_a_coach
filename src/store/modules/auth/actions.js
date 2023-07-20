export default {
    async login(context, payload) {
        const response = await fetch(`${process.env.VUE_APP_LOGIN_URL}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        context.commit('setAuth', { isAuth: true })
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to login. Please check your login info.');
        }
    },
    async signup(context, payload) {
        const response = await fetch(`${process.env.VUE_APP_SIGNUP_URL}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to authenticate. Please check your info and try again.');
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    }
};