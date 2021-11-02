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
          const resp =  await eventApi.put(`/events/${data.name}.json`, dataToSave)
            console.log(resp)
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

        commit('loadEventMutation', data)


    }catch{
        console.log(error.message)
    }
}

export const joinEventAction = async ({commit}, dataToSave) => {
    const {id} = dataToSave
    console.log('llega', id)
    try{

        const {data} = await eventApi.put(`/events/${id}.json`, dataToSave)
        console.log(data)
        commit('joinEventMutation', dataToSave)
    }catch(error){
        console.log(error.message)
    }
}