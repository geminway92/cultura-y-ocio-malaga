<template>
  <div class="container-login">
    <div class="container-form">
      <form @submit.prevent="">
        <div class="container-email">
          <h1>E-mail</h1>
          <input type="email">
        </div>
        <div class="container-password">
          <h1>Contraseña</h1>
          <input type="password">
        </div>
        <router-link 
          class="routerlink-password" 
          :to="{name: 'forgetpassword'}">
          
            Olvidé la contraseña
          </router-link>
        <button class="button-anonymous">
            <i class="fas fa-mask"></i>
           Anónimo</button>
        <button class="button-login">Iniciar Sesión</button>
      </form>
    </div>
    <h2 class="routerlink-register">¿No tienes cuenta? <router-link class="link" :to="{name: 'register'}">Regístrate</router-link></h2>
  </div>
</template>

<script>
export default {
  name: 'login',
  emits: ['changeTextIntro'],
  data(){
    return{
      textIntro: 'Inicia sesión para ver tus eventos o entra en anónimo si solo deseas ver lo que hay'
    }

  },
  
  methods:{
    goRouteLink(route){
      this.$router.push({name: 'forgetpassword'})
    }
  },

  created(){
    this.$emit('changeTextIntro', this.textIntro)
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

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #F3F3F4 inset;  /*Para cambiar el fondo en chrome cuando tienes autocompletado*/
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

.routerlink-password,
.routerlink-register {
  font-size: 1em;
  width: 170px;
  margin: auto;
}

.button-anonymous,
.button-login {
  background-color: var(--colorPrimary);
  color: #ffffff;
  width: 170px;
  height: 35px;
  border-radius: 15px;
  border:none;
  border-top: 4px solid #821D90;
  margin: 1em auto;
  font-size: .9em;
  cursor: pointer;
}

.button-anonymous{
  background: var(--colorSecundary);
  border-top: 4px solid #71706E;

}

.button-anonymous:active{
  border-top: var(--colorSecundary);
}

.button-anonymous i {
  margin-right: .5em;
}

.button-login:active{
  border-top: var(--colorPrimary);
}

.routerlink-register{
  width: 200px;
  margin-top: 2em;
}

.link{
  color: var(--colorPrimary);
  cursor: pointer;
}
</style>