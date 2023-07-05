export default {
    namespaced: true,
    state() {
        return {
            requsets: []
        }

    },
    mutations: {
        ADD_REQUEST(state, payload) {
            state.requsets.push(payload)
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
    getters: {}
}