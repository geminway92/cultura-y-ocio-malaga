import eventApi from "../../../../api/eventApi"


export const createEvent = async ({commit}, events) => {

    try{
        const {data} = await eventApi.post(`events.json`, events)
        console.log(data)
        
        commit('createEventMutation',events)

        return {ok: true , message: 'Evento creado correctamente'}


    }catch(error){
        return {ok: false, message: error.message}
    }

    
}

export const loadEvent = async ({commit}) => {
    try{
        const {data} = await eventApi.get('/events.json')
        console.log(data)
        commit('loadEventMutation', data)

    }catch{
        console.log(error.message)
    }
}