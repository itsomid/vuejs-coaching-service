export default {
    namespaced: true,
    state() {
        return {
            token: null || localStorage.getItem('token'),
            userId: null ||  localStorage.getItem('userId'),
            tokenExpiration: null
        }
    },
    mutations: {
        SET_USER(state, payload) {
            state.token = payload.token
            state.userId = payload.userId
            state.tokenExpiration = payload.tokenExpiration
        }
    },
    actions: {
        async login(context, payload) {
           return context.dispatch('auth',{
                ...payload,
                mode: 'login'
            })
        },
        async signup(context, payload) {
            return context.dispatch('auth',{
                ...payload,
                mode: 'signup'
            })
        },
        async auth(context, payload){
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6kEichtbiz3Wo7opV-p2JIMbPiYhaIsc';

            if (payload.mode === 'signup'){
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6kEichtbiz3Wo7opV-p2JIMbPiYhaIsc'
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            })
    
            const responseData = await response.json()
            if(!response.ok){
                const error = new Error(responseData.error.message || 'Failed to Authenticated')
                throw error
            }
            localStorage.setItem('token',responseData.idToken)
            localStorage.setItem('userId',responseData.localId)

            context.commit('SET_USER',{
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            })

            console.log(responseData);
        },
        logout(context){
            context.commit('SET_USER',{
                token: null,
                userId: null,
                tokenExpiration: null
            })
        }
    },
    getters: {
        userId(state) {
            return state.userId
        },
        token(state){
            return state.token
        },
        isAuthenticated(state){
            return !!state.token
        }
    }
}