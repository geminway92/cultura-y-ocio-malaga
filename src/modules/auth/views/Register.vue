<template>
  <div class="register">
    <div class="container-form">
      <form autocomplete="off">
        <div class="container-input">
          <h1>Nombre</h1>
          <input type="text" placeholder="Escribe su nombre">
          <h1>E-mail</h1>
          <input type="email" placeholder="Escribe  su email">
          <h1>Contraseña</h1>
          <input type="password" placeholder="Escriba la contraseña">
        </div>
        <button class="button-register">Crear Cuenta</button>
      </form>
    </div>
    <h2 class="routerlink-login">¿Tienes cuenta? <router-link class="link" :to="{name: 'login'}"><span>Inicia Sesión</span></router-link></h2>
  </div>
</template>

<script>
export default {
  name: 'register',
  emits:['changeTextIntro','changeTitleIntro'],
  data(){
    return{
      textIntro: 'Crea una cuenta con nosotros y disfruta de todos nuestros emocionantes eventos',
      titleIntro: 'Regístrate en '
    }
  },

  mounted(){
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
  border-top: 4px solid #821D90;
  margin: 1.3em auto .9em;
  font-size: .9em;
  cursor: pointer;
}

.button-register:active{
  border-top: var(--colorPrimary);
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