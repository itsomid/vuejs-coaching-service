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

        },
        SET_REQUESTS(state, payload) {
            state.requests = payload
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
            const response = await fetch(`https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}/${uniqueName}.json`, {
                method: 'PUT',
                body: JSON.stringify(newRequest)
            })

            const responseData = await response.json()
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to send request!')
                throw error;
            }

            newRequest.id = uniqueName
            context.commit('ADD_REQUEST', newRequest)
        },
        async fetchRequest(context) {

            const coachId = context.rootGetters['authStore/userId']
            const token = context.rootGetters['authStore/token']
            const response = await fetch(`https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token)
            const responseData = await response.json()

            if (!response.ok) {
                // console.log(responseData);
                const error = new Error(responseData.error || 'Failed to fetch requests!')
                throw error
            }

            const requests = []
            for (const key in responseData) {
                const data = {
                    id: key,
                    email: responseData[key].email,
                    message: responseData[key].message,
                    coachId: coachId
                }
                requests.push(data)
            }
            console.log('re3', requests)
            context.commit('SET_REQUESTS', requests)
        }
    },
    getters: {
        requests(state, getters, rootSate, rootGetters) {
            const coachId = rootGetters['authStore/userId']
            return state.requests.filter(req => req.coachId === coachId)
        },
        hasRequests(state, getters) {
            return getters.requests && getters.requests.length > 0
        }
    }
}