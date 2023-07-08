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
        requests(state, getters, rootSate, rootGetters) {
            const coachId = rootGetters.userId
            console.log(state.requests);
            return state.requests.filter(req => req.coachId === coachId)
        },
        hasRequests(state, getters) {
            return getters.requests && getters.requests.length > 0
        }
    }
}