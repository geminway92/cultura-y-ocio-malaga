
export const createEventMutation = (state, events ) =>{

    state.events = 

    console.log(state.events)

}

export const loadEventMutation = (state, payload) => {
    
    console.log(state.events)
    state.events = payload
}