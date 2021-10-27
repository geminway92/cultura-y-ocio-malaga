import axios from 'axios'


const eventApi =  axios.create({
    baseURL: 'https://datosabiertos.malaga.eu/ca/api/3/action/datastore_search?',
    params:{
        resource_id: '6dc53e72-753d-4a84-a151-24fc135cd742'
    }
})


export default eventApi