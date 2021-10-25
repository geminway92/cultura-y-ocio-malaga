<template>
  <div class="container-login">
    <div class="container-form">
      <form @submit.prevent="loginUser()">
        <div class="container-email">
          <h1>E-mail</h1>
          <input type="email" placeholder="Escribe su email" v-model="userForm.email">
        </div>
        <div class="container-password">
          <h1>Contraseña</h1>
          <input type="password" placeholder="Escribe la contraseña" v-model="userForm.password">
        </div>
        <router-link 
          class="routerlink-password" 
          :to="{name: 'forgetpassword'}">
            Olvidé la contraseña
          </router-link>
        <button class="button-login">Iniciar Sesión</button>
      </form>
        <button class="button-anonymous">
            <i class="fas fa-mask"></i>
           Anónimo</button>
    </div>
    <h2 class="routerlink-register">¿No tienes cuenta? <router-link class="link" :to="{name: 'register'}">Regístrate</router-link></h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'login',
  emits: ['changeTextIntro','changeTitleIntro'],
  data(){
    return{
      textIntro: 'Inicia sesión para ver tus eventos o entra en anónimo si solo deseas ver lo que hay',
      titleIntro: 'Bienvenido a ',
      userForm: {
        email: '',
        password: ''
      }
    }

  },
  
  methods:{
    ...mapActions('auth',['signInUser']),

    async loginUser(){
      const resp = await this.signInUser(this.userForm)
      console.log(resp)
      
      if(resp.message === 'INVALID_PASSWORD'){
        resp.message = 'Contraseña Incorrecta'
      
      } else if(resp.message === 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'){
        resp.message = 'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restablecerlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.'
      
      }else if(resp.message === 'EMAIL_NOT_FOUND'){
        resp.message = 'Email no registrado'
      
      }else if(resp.message === 'MISSING_PASSWORD'){
        resp.message = 'Rellene la contraseña'
      }

      if(!resp.ok)Swal.fire({
        icon: 'error',
        title: resp.message,
        confirmButtonColor: '#B128C3',
      })

      console.log(resp)
    }




  },

  created(){
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
  width: 85%;
  height: 30px;
  border-radius: 10px;
  background-color: #F3F3F4;
  padding: .5em;
  border: none;
  margin: 1.1em auto 2em;
  padding-left: 1.3em;
}

.container-login{
  width: 85%;
  margin: 2em auto;
}

.container-email h1,
.container-password h1 {
  font-size: 1.1em;
  color: #AAAAAC;
  font-weight: 400;
  text-align: start;
  width: 80%;
  margin:  auto;
}

.routerlink-password {
  font-size: 1em;
  width: 170px;
  margin: auto;
}

.button-login {
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

.button-anonymous{
  color: #ffffff;
  width: 170px;
  height: 35px;
  border-radius: 15px;
  border:none;
  margin: 1em auto;
  font-size: .9em;
  cursor: pointer;
  background: var(--colorSecundary);
  box-shadow: 2px 0px 1px #c4c4c4;
}

.button-anonymous:active,
.button-login:active {
  box-shadow: -3px 4px 3px hsla(0, 0%, 0%, 0.25) inset, 2px -2px 3px rgba(0,0,0, 0.25) inset;
} 

.button-anonymous i {
  margin-right: .5em;
}

.routerlink-register{
  width: 200px;
  margin: 2em auto;
  font-size: 1em;
}

.link{
  color: var(--colorPrimary);
  cursor: pointer;
}
</style>