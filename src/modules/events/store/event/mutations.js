
export const createEventMutation = (state, events ) =>{

    state.events = {...events, ...state.events}

}

export const loadEventMutation = (state, payload) => {

    state.events = payload

}

export const joinEventMutation = (state, payload) => {
    state.events = payload
    state.eventRegister.push(payload)
}

export const SET_EVENT_USER = (state, myEvents) => {
    state.eventRegister = myEvents

}

export const UPDATE_EVENT_ANONIMOUS = (state, myEvents) =>{
    const eventsArray = [];
    if(localStorage.getItem("myEvents") != null) {
        const eventsLocalStorage = JSON.parse(localStorage.getItem("myEvents"));
        eventsLocalStorage.forEach(e => {
            eventsArray.push(e)
        });
        eventsArray.push(myEvents)
        localStorage.setItem("myEvents", JSON.stringify(eventsArray))
        state.eventRegister = eventsArray
    }else {
        eventsArray.push(myEvents)
        localStorage.setItem("myEvents", JSON.stringify(eventsArray))
        state.eventRegister.push( myEvents);

    }
}

export const LOAD_EVENT_ANONIMOUS = (state) =>{
    const eventsArray = [];
    if(localStorage.getItem("myEvents") != null) {
        const eventsLocalStorage = JSON.parse(localStorage.getItem("myEvents"));
        eventsLocalStorage.forEach(e => {
            eventsArray.push(e)
        });
        state.eventRegister = eventsArray
    }
}

export const RESET_STATE = (state) => {

    state.eventRegister = []
    state.events = null

}
