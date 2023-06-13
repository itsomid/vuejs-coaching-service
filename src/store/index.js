import { createStore } from 'vuex'
import cochesStore from './coaches/index'
import requestStore from './requests/index'
const store = createStore({
    cochesStore,
    requestStore
})

export default store;