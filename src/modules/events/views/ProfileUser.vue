<template>
   <header>
      <div class="container-header">
         <i class="fas fa-chevron-left icon-back"></i>
         <h2>Ajuste</h2>
      </div>
   </header>
   <body>
      <div class="container-profile-user">
         <div class="container-top">
            <h1 class="title-name">Hola {{ this.user.name }}</h1>
            <img
               class="profile-photo"
               src="../../../assets/images/2.jpg"
               alt=""
            />
            <hr />
            <h4>Perfil</h4>
         </div>

         <div class="container-ul">
            <ul>
               <li>
                  Cambiar nombre
                  <i class="fas fa-chevron-right"></i>
               </li>
               <li>
                  Cambiar foto de perfil
                  <i class="fas fa-chevron-right"></i>
               </li>
               <li>
                  Cambiar contraseña
                  <i class="fas fa-chevron-right"></i>
               </li>
            </ul>
         </div>

         <button>Cerrar sesión</button>
      </div>
   </body>
</template>

<script>
import { mapState } from 'vuex';
export default {
   name: 'profileUser',
   data() {
      return {
         userName: ''
      };
   },

   computed: {
      ...mapState('auth', ['user'])
   }
};
</script>

<style scoped>
header {
   background-color: #b128c3;
   color: white;
   width: 100vw;
   height: 80px;
   display: flex;
   justify-content: end;
}

h2 {
   margin: auto;
}

hr {
   background-color: #b128c3;
   width: 80%;
}

button {
   background-color: #b128c3;
   border: none;
   border-radius: 15px;
   padding: 0.7em;
   margin-top: 0.5em;
   color: white;
}

button:active {
   background-color: #8e239c;
}

@media screen and (min-width: 360px) {
   button {
      margin-top: 3em;
   }
}

@media screen and (min-width: 700px) {
   button {
      font-size: 1em;
      width: 140px;
      padding: 1em;
      margin: auto;
      margin-top: 3em;
   }
}

.container-header {
   display: flex;
   width: 100%;
   flex-direction: row;
   margin: auto;
}

.icon-back {
   display: flex;
   height: min-content;
   font-size: 1.5em;
   position: relative;
   left: 1em;
}

@media screen and (min-width: 700px) {
   .container-profile-user {
      height: 85vh;
      display: flex;
      flex-direction: column;
   }
}

@media screen and (min-width: 360px) {
   .container-top {
      font-size: 1.2em;
      height: 200px;
      margin-bottom: 1em;
   }
}

@media screen and (min-width: 700px) {
   .container-top {
      font-size: 1.6em;
   }
}
.title-name {
   color: black;
}

.profile-photo {
   width: 70px;
   border-radius: 100%;
}

@media screen and (min-width: 700px) {
   .profile-photo {
      width: 100px;
   }
}

.container-ul {
   width: max-content;
   margin: auto;
}

@media screen and (min-width: 700px) {
   .container-ul {
      width: 300px;
      display: flex;
      margin-bottom: 0;
   }
}

.container-ul ul {
   list-style: none;
   width: 200px;
   display: flex;
   flex-direction: column;
   justify-content: start;
   margin: auto;
}

.container-ul li {
   width: 220px;
   display: flex;
   justify-content: space-between;
   border: 1px solid #aeaeae;
   border-radius: 3px;
   padding: 0.7em;
   position: relative;
   left: -40px;
}

@media screen and (min-width: 700px) {
   .container-ul li {
      padding: 1em 3em;
      font-size: 1.3em;
      margin: auto;
      left: -90px;
   }
}

.fa-chevron-right {
   color: #aeaeae;
}
</style>
