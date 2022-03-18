<template>
  <div class="register">
    <div class="container-form">
      <form @submit.prevent="onSubmit()" autocomplete="off">
        <div class="container-input">
          <h1>Nombre</h1>
          <input
            type="text"
            placeholder="Escribe su nombre"
            v-model.trim="userForm.name"
            required
          >
          <h1>E-mail</h1>
          <input
            type="email"
            autocomplete="username"
            placeholder="Escribe su email"
            v-model.trim="userForm.email"
            required
          >
          <h1>Contraseña</h1>
          <input
            type="password"
            autocomplete="current-password"
            placeholder="Escriba la contraseña"
            v-model.trim="userForm.password"
            required
          >
        </div>
        <button type="submit" class="button-register">Crear Cuenta</button>
      </form>
    </div>
    <h2 class="routerlink-login">¿Tienes cuenta? <router-link class="link" :to="{name: 'login'}"><span>Inicia Sesión</span></router-link></h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'register',
  emits: ['changeTextIntro', 'changeTitleIntro'],
  data () {
    return {
      textIntro: 'Crea una cuenta con nosotros y disfruta de todos nuestros emocionantes eventos',
      titleIntro: 'Regístrate en ',
      userForm: {
        name: '',
        email: '',
        password: '',
        photo: 'https://res.cloudinary.com/ddn278n2q/image/upload/v1635241873/PhotoByDefault/ecx55iufi8mxk7imvpcd.jpg'
      }
    }
  },

  methods: {
    ...mapActions('auth', ['createUser']),

    onSubmit () {
      this.registerUser(this.userForm)
    },

    async registerUser (user) {
      const resp = await this.createUser(user)

      if ('EMAIL_EXISTS' === resp.message) {
        resp.message = 'La dirección de correo eléctronico ya está en uso'
      } else if ('OPERATION_NOT_ALLOWED' === resp.message) {
        this.message = 'El inicio de sesión con contraseña está desactivado para este proyecto'
      } else if ('TOO_MANY_ATTEMPTS_TRY_LATER' === resp.message ) {
        resp.message = 'Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde'
      } else if ('INVALID_EMAIL' === resp.message) {
        resp.message = 'El correo eléctronico no es correcto'
      }

      if (resp.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: resp.message,
          confirmButtonColor: '#B128C3'
        })
      }

      this.resetUserForm()
      this.$router.push({ name: 'eventlayout' })
    },

    resetUserForm () {
      this.userForm = {
        name: '',
        email: '',
        password: '',
        photo: 'https://res.cloudinary.com/ddn278n2q/image/upload/v1635156375/PhotoByDefault/ecx55iufi8mxk7imvpcd.jpg'
      }
    }
  },

  mounted () {
    this.$emit('changeTextIntro', this.textIntro)
    this.$emit('changeTitleIntro', this.titleIntro)
  }

}

</script>

<style scoped>
form{
  display: flex;
  flex-direction: column;
}

input{
  width: 90%;
  height: 30px;
  border-radius: 10px;
  background-color: #F3F3F4;
  padding: .5em;
  border: none;
  margin: 1.1em auto .5em;
  padding-left: 1.3em;
}

h1{
  padding-left: 1em;
  margin: .3em 0;
}
.register{
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 1200px) {
  .register{
    width: 50%;
    margin: auto;
  }
}

.container-form{
  width: 85%;
  margin: 1em auto;
}

.container-input{
  width: 95%;
  font-size: .9em;
  color: #AAAAAC;
  font-weight: 400;
  text-align: start;
  margin: auto;
}

.button-register{
  background-color: var(--colorPrimary);
  color: #ffffff;
  width: 170px;
  height: 35px;
  border-radius: 15px;
  border:none;
  margin: 1.3em auto .9em;
  font-size: .9em;
  cursor: pointer;
}

.button-register:active{
  box-shadow: -3px 4px 3px hsla(0, 0%, 0%, 0.25) inset, 2px -2px 3px rgba(0,0,0, 0.25) inset;
}

.routerlink-login{
  width: 200px;
  font-size: 1em;
  margin: 2.5em auto 0;
}

.link{
  color: var(--colorPrimary);
  cursor: pointer;
}
</style>
