import authApi from "../../../../api/authApi"


export const createUser = async ({ commit }, user ) => {

    const { name, email, password, photo } = user

    try{
        const {data} = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        const { idToken, refreshToken } = data

        const resp = await authApi.post(':update', { idToken, refreshToken, photoUrl: photo, displayName: name }, )
        console.log(resp.date)

        delete user.password
        commit('loginUser', {user, idToken, refreshToken})
        return { ok: true }

    }catch (error){
        return { ok: false, message: error.response.data.error.errors[0].message }

    }
}

export const signInUser = async ({commit}, user) =>{

    const { email, password } = user

    try{
        const {data} = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        const { idToken, refreshToken, displayName, profilePicture } = data
        user.name = displayName
        user.photo = profilePicture
        console.log(data)

        delete user.password
        commit('loginUser', {user, idToken, refreshToken})

        return {ok: true}

    }catch(error){
        return {ok: false, message: error.response.data.error.errors[0].message}

    }
}


export const checkAuth = async ({commit}) => {

    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!idToken){
        commit('logout')
        return {ok: false, message: 'No hay token'}
    }

    try{

        const {data} = await authApi.post(':lookup', {idToken})
        const {displayName, email, refreshToken, photoUrl} = data.users[0]

        const user = {
            name: displayName,
            email,
            profilePicture: photoUrl
        }

        commit('loginUser', {user, idToken, refreshToken})
        return {ok: true }

    }catch(error){
        commit('logout')
        return {ok: false, message: error.response.data.error.errors[0].message}

    }
}

export const changePassword = async({commit}, email) => {
    console.log(email)
    try{
        const {data} = await authApi.post(':sendOobCode', {email, requestType: 'PASSWORD_RESET'})
        return {ok: true}

    }catch(error){
        return { ok: false, message: error.response.data.error.errors[0].message}
    }
}

export const userAnonimous = async ({commit}) =>{

    try{
        const {data} = await authApi.post(':signUp',{returnSecureToken: true})
        const {idToken, refreshToken} = data

        commit('loginUser',{ idToken, refreshToken})

        return {ok: true}

    }catch(error){

        return {ok: false, message: error.response}
    }
}

export const logout = async ({commit}) => {

    commit('logoutMutation')
}
