<template>
  <div class="page404">
      <div class="container">
        <img src="../assets/images/404.jpg" alt="">
        <h1>Oops esa ruta no existe, regrese a  la página principal</h1>
        <button @click="goRouteLogin()">Inicio</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'pageError404',
  methods: {
    goRouteLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

img{
    width: 80%;
    margin: 0 auto;
}

button{
    background-color: #FF4F5A;
    color: #ffffff;
    width: 170px;
    height: 35px;
    border-radius: 15px;
    border:none;
    margin: 1em auto;
    font-size: .9em;
    cursor: pointer;
}

button:active{
    box-shadow: -3px 4px 3px hsla(0, 0%, 0%, 0.25) inset, 2px -2px 3px rgba(0,0,0, 0.25) inset;

}

.page404{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.container{
    margin: auto;
}

</style>
