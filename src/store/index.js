import { createStore } from 'vuex'

import auth from '../modules/auth/store/auth/index'
import event from '../modules/events/store/event/index'
import updateStore from '../modules/updateProfile/store/updateStore/index.js'

const store = createStore({
  modules: {
    auth,
    event,
    updateStore
  }
})

export default store
