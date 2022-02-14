
export const createEventMutation = (state, events ) =>{

    state.events = {...events, ...state.events}

}

export const loadEventMutation = (state, payload) => {

    state.events = payload

}

export const joinEventMutation = (state, payload) => {
    state. events = payload
}

export const SET_EVENT_USER = (state, myEvents) => {
    state.eventRegister.push(myEvents)

}
