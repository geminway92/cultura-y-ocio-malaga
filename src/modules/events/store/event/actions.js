import eventApi from "../../../../api/eventApi"


export const getEvents = async ({commit}) => {
    
    const {data} = await eventApi.post('')
    const { result: {records} } = data
    console.log(records)

    commit('getAllEvents', records)

    return records
    
}