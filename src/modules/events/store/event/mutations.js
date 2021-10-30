
export const createEventMutation = (state, events ) =>{

    state.events = [...events, ...state.events]

}

export const loadEventMutation = (state, payload) => {

    state.events.push(payload) 

}