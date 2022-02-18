
export const loginUser = (state, { user, idToken, refreshToken }) => {
  if (idToken) {
    localStorage.setItem('idToken', idToken)
    state.idToken = idToken
  }

  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
    state.refreshToken = refreshToken
  }

  state.user = user
  state.status = 'authenticated'
}

export const logoutMutation = (state) => {
  /* No se debe poner el objeto user en null, sino dará problema el profilePicture al no tener ningñun valor */
  state.user = {
    name: '',
    email: '',
    profilePicture: 'https://res.cloudinary.com/ddn278n2q/image/upload/v1635241873/PhotoByDefault/ecx55iufi8mxk7imvpcd.jpg'
  }
  state.idToken = null
  state.refreshToken = null

  localStorage.removeItem('idToken')
  localStorage.removeItem('refreshToken')
}
