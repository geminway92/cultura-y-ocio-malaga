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
        console.log(error.response.data.error.errors[0])
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
