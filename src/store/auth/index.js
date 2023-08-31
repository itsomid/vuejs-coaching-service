export default {
    namespaced: true,
    state(){
        return{
           token: null,
           userId: null,
           tokenExpiration: null
        }
    },
    mutations:{
        SET_USER(state, payload){
          state.token = payload.token
          state.userId = payload.userId
          state.tokenExpiration = payload.tokenExpiration

        }
    },
    actions: {
        login() {

        },
        async signup(context, payload) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6kEichtbiz3Wo7opV-p2JIMbPiYhaIsc',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            })

            const responseData = await response.json()
            if(!response.ok){
                console.log(responseData.error);
                const error = new Error(responseData.error.message || 'Failed to Authenticated')
                throw error;
            }
            context.commit('SET_USER',{
                token: responseData.token,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            })
            console.log(responseData);
            
        }
    },
    getters: {
        userId(state) {
            return state.userId
        }
    }
}