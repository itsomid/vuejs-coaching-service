import { createStore } from 'vuex'
import coachesStore from './coaches/index'
import requestStore from './requests/index'
import authStore from './auth/index'

console.log(coachesStore);
const store = createStore({
    modules: {
        coachesStore,
        requestStore,
        authStore
    },
    state() {
        return {
            userId: 'c3'
        }
    },
 

})

export default store;