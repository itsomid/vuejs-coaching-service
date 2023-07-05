export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }

    },
    mutations: {
        ADD_REQUEST(state, payload) {
            state.requests.push(payload)
       
        }
    },
    actions: {
        contactCoach(context, payload) {
            const newRequest = {
                id: new Date().toISOString,
                coachId: payload.coachId,
                email: payload.email,
                message: payload.message
            }
            context.commit('ADD_REQUEST', newRequest)
        }
    },
    getters: {
        requests(state){
            return state.requests
        },
        hasRequests(state){
            return state.requests && state.requests.length > 0
        }
    }
}