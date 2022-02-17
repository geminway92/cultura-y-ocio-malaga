import eventApi from "../../../../api/eventApi"


export const createEvent = async ({commit}, events) => {
    const { name, description, date, joined, photo, schedule,register } = events
    try{
        const {data} = await eventApi.post(`events.json`, events)
        console.log(data,'es la data')

        const dataToSave = {
            id: data.name,
            name,
            description,
            date,
            joined,
            photo,
            schedule,
            register,
        }


        try{
          await eventApi.put(`/events/${data.name}.json`, dataToSave)

        }catch (error){
            return {ok: false, message: error.message}
        }


        commit('createEventMutation', dataToSave)
        return {ok: true , message: 'Evento creado correctamente'}


    }catch(error){

        return {ok: false, message: error.message}
    }


}

export const loadEventAction = async ({commit}) => {
    try{
        const {data} = await eventApi.get('/events.json')
        if(data === null){
            return
        }else {
            commit('loadEventMutation', data)
        }



    }catch(error){
        console.log(error.message)
    }
}

export const joinEventAction = async ({commit,dispatch }, {dataToSave, eventUser}) => {
    const {id} = dataToSave

    dispatch('addEventUser',eventUser)
    try{

        const {data} = await eventApi.put(`/events/${id}.json`, dataToSave)
        console.log(data)
        commit('joinEventMutation', eventUser)
        return {ok: true, message: 'Añadido al evento'};

    }catch(error){
        console.log(error.message)
        return {ok: false, message: error.message}
    }
}

export const addEventUser = async ({commit }, myEvents) => {
    let emailSplit = {...myEvents.id.split('@')}
         console.log(emailSplit)
    try{
        const {data} = await eventApi.post(`${emailSplit[0]}.json`, myEvents)
        myEvents.id =  data.name;

        if(data === null){
            return
        }

        try{
            await eventApi.put(`/eventsUsers/${data.name}.json`,myEvents)
            commit('SET_EVENT_USER', myEvents)
        }catch(error){
            console.log(error.message)
        }


    }catch(error){
        console.log(error.message)
    }

}

export const loadEventUser = async ({commit}, user) => {

    let eventsArray = []
    try {
        const {data} = await eventApi.get(`/${user}.json`)

        if(data === null){
            return
        }else{
            const value = Object.values(data)
            value.forEach(e => {
                eventsArray.push(e)
            });

            commit('SET_EVENT_USER', eventsArray)
        }

    }catch(error){
        console.log(error.message)
    }
}

export const loadEventAnonimous = async ({commit}) => {
    commit('LOAD_EVENT_ANONIMOUS')
}

export const updateEventAnonimous = async ({commit}, event) => {
    commit('UPDATE_EVENT_ANONIMOUS', event)
}

export const resetState = async ({commit}) => {
    commit ('RESET_STATE')
}
