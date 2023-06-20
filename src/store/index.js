import { createStore } from 'vuex'
import coachesStore from './coaches/index'
import requestStore from './requests/index'
console.log(coachesStore);
const store = createStore({
    modules: {
        coachesStore,
        requestStore
    },
    state() {
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state) {
            return state.userId
        }
    }

})

export default store;