import  axios from 'axios'


const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
        params:{
            key: 'AIzaSyBHaGNRGh35d6ri6UU_3akgLbnnJ3k_Mag'
        }
    
})


export default authApi