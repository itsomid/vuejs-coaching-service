import { createStore } from 'vuex'
import coachesStore from './coaches/index'
import requestStore from './requests/index'
console.log(coachesStore);
const store = createStore({
    modules:{
        coachesStore,
        requestStore
    }

})

export default store;