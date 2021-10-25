import { createStore } from 'vuex'

import auth from '../modules/auth/store/auth/index'

const store = createStore({
  modules: {
    auth,
  }
})


export default store