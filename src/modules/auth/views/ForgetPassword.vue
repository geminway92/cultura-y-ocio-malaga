<template>
  <div class="container-forget-password">
    <div class="container-form">
      <form @submit.prevent="forgetPassword" autocomplete="off">
        <h1 class="title-email">E-mail</h1>
        <input
          type="email"
          placeholder="Escriba su email"
          v-model="email"
        >
        <button class="button-forget-password">Solicitar Contraseña</button>
      </form>
    </div>
    <h2 class="routerlink-register">¿No tienes cuenta? <router-link class="link" :to="{name: 'register'}">Regístrate</router-link></h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'forgetpassword',
  emits: ['changeTextIntro', 'changeTitleIntro'],
  data () {
    return {
      textIntro: 'No se preocupe, recibirá un correo y podrá restablecer su contraseña',
      titleIntro: 'A un paso de ',
      email: ''
    }
  },

  methods: {
    ...mapActions('auth', ['changePassword']),

    async forgetPassword () {
      const resp = await this.changePassword(this.email)

      if (resp.message === 'INVALID_EMAIL') {
        resp.message = 'La dirección de correo electrónico no existe.'
      } else if (resp.message === 'MISSING_EMAIL') {
        resp.message = 'No has escrito ningún email'
      } else if (resp.message === 'EMAIL_NOT_FOUND') {
        resp.message = 'No hay ningún registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.'
      } else if (resp.message === 'RESET_PASSWORD_EXCEED_LIMIT') {
        resp.message = 'Se ha excedido las peticiones de resetear contraseña, inténtelo más tarde'
      } else if (resp.message === 'QUOTA_EXCEEDED : Email quota exceeded') {
        resp.message = 'Has excedido la cuota de peticiones'
      }

      if (!resp.ok) {
        Swal.fire({
          icon: 'error',
          title: resp.message,
          confirmButtonColor: '#B128C3'

        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Solicitud enviada',
          showConfirmButton: false,
          timer: 1500
        })
      }

      if (resp.ok) {
        this.email = ''
        this.$router.push({ name: 'login' })
      }
    }
  },

  created () {
    this.$emit('changeTextIntro', this.textIntro)
    this.$emit('changeTitleIntro', this.titleIntro)
  }

}
</script>

<style scoped>

input{
  width: 85%;
  height: 30px;
  border-radius: 10px;
  background-color: #F3F3F4;
  padding: .5em;
  border: none;
  margin: 1.1em auto 2em;
  padding-left: 1.3em;
}

.container-forget-password{
  width: 100%;
  height: 100%;
}

.container-form{
  width: 85%;
  margin: 3em auto;
}

.title-email{
  width: 85%;
  font-size: 1em;
  color: #AAAAAC;
  font-weight: 400;
  text-align: start;
  margin: auto;

}

.button-forget-password{
  background-color: var(--colorPrimary);
  color: #ffffff;
  width: 170px;
  height: 35px;
  border-radius: 15px;
  border:none;
  margin: 1em auto;
  font-size: .9em;
  cursor: pointer;
}

.button-forget-password:active{
  box-shadow: -3px 4px 3px hsla(0, 0%, 0%, 0.25) inset, 2px -2px 3px rgba(0,0,0, 0.25) inset;
}

.routerlink-register{
  width: 200px;
  position: relative;
  margin: auto ;
  font-size: 1em;
  top: 11em;
}

.link{
  color: var(--colorPrimary);
  cursor: pointer;
}
</style>
