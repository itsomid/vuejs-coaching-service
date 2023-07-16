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
       async contactCoach(context, payload) {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 8);
        const uniqueName = `${timestamp}-${randomString}`;
            const newRequest = {
                coachId: payload.coachId,
                email: payload.email,
                message: payload.message
            }
            const response = await fetch(`https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}/${uniqueName}.json`,{
                method: 'PUT',
                body: JSON.stringify(newRequest)
            })
    
            const responseData = await response.json()
            if(!response.ok){
                const error = new Error(responseData.message || 'Failed to send request!')
                throw error;
            }
   
            newRequest.id = uniqueName
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