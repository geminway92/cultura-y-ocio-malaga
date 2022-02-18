import authApi from '../../../../api/authApi'

export const updateUserAction = async ({ commit }, user) => {
  const { idToken, refreshToken, name, profilePicture } = user

  try {
    await authApi.post(':update', {
      idToken,
      refreshToken,
      displayName: name,
      photoUrl: profilePicture
    })

    commit('updateUser', { user, idToken, refreshToken })

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      message: error
    }
  }
}

export const changePasswordAction = async ({ commit }, user) => {
  const { idToken, password } = user
  try {
    await authApi.post(':update', {
      idToken,
      password,
      returnSecureToken: true
    })

    return { ok: true }
  } catch (error) {
    return { ok: false, message: error.response.data.error.message }
  }
}
