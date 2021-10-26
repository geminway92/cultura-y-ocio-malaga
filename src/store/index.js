import { createStore } from 'vuex'

import auth from '../modules/auth/store/auth/index'
import event from '../modules/events/store/event/index'
const store = createStore({
  modules: {
    auth,
    event

  }
})


export default store