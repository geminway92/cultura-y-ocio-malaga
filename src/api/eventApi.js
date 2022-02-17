import axios from 'axios'

const eventApi = axios.create({
  baseURL: 'https://malaga-event-default-rtdb.firebaseio.com/'
})

export default eventApi
