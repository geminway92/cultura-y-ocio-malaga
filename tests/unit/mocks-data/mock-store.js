import { createStore } from "vuex";

import auth from '../../../src/modules/auth/store'
import events from '../../../src/modules/events/store'

import { eventState } from "./test-journal-state"

const createVuexStore = ( authInitState, eventInitState = eventState) =>
    createStore({
        modules: {
            auth: {
                ...auth,
                state: { ...authInitState}
            },
            events: {
                ...events,
                state: { ...eventInitState}
            }
        }
    })


export default createVuexStore
