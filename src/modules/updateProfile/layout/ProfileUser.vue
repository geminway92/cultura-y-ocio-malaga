<template>
   <UpdateNameModal
      :openModalNewName="openModalNewName"
      @changeName="changeName"
   />
   <UpdatePhotoModal
      :openModalPhoto="openModalPhoto"
      @changePhoto="changePhoto"
   />
   <UpdatePasswordModal
      :openModalNewPassword="openModalNewPassword"
      @changePassword="changePassword"
   />
   <div class="container-header">
      <span
         @click="this.goRouteCurrentEvent()"
         class="fas fa-chevron-left icon-back"
      ></span>
      <h1>Ajustes</h1>
   </div>

   <body>
      <div class="container-profile-user">
         <div class="container-top">
            <h2 class="title-name">Hola {{ this.user.name || "Anónim@" }}</h2>
            <img v-if="this.user.profilePicture"
               class="profile-photo"
               :src="this.user.profilePicture"
               alt="foto de usuario"
            />
            <hr />
            <h3>Perfil</h3>
         </div>

         <div class="container-ul">
            <ul>
               <li @click="this.changeName()">
                  Cambiar nombre
                  <span class="fas fa-chevron-right"></span>
               </li>
               <li @click="this.changePhoto()">
                  Cambiar foto
                  <span class="fas fa-chevron-right"></span>
               </li>
               <li @click="this.changePassword()">
                  Cambiar contraseña
                  <span class="fas fa-chevron-right"></span>
               </li>
            </ul>
         </div>

         <button @click="this.onLogout()">Cerrar sesión</button>
      </div>
   </body>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'profileUser',
  components: {
    UpdateNameModal: defineAsyncComponent(() =>
      import(
        /* webpackChunckName: "updateNameModal" */ '../components/UpdateNameModal.vue'
      )
    ),
    UpdatePhotoModal: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "updatePhotoModal" */ '../components/UpdatePhotoModal.vue'
      )
    ),
    UpdatePasswordModal: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "updatePasswordName" */ '../components/UpdatePasswordModal.vue'
      )
    )
  },

  data () {
    return {
      userName: '',
      openModalNewName: false,
      openModalPhoto: false,
      openModalNewPassword: false,
      file: ''
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),

    goRouteCurrentEvent () {
      this.$router.push({ name: 'eventlayout' })
    },

    onLogout () {
      this.logout()
      this.$router.push({ name: 'login' })
    },

    changeName () {
      this.openModalNewName = !this.openModalNewName
    },

    changePhoto () {
      this.openModalPhoto = !this.openModalPhoto
    },

    changePassword () {
      this.openModalNewPassword = !this.openModalNewPassword
    }
  },

  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<style scoped>

hr {
   background-color: #b128c3;
   width: 80%;
}
h3{
   padding: 1em;
   height: min-content;
}
button {
   background-color: #b128c3;
   border: none;
   border-radius: 15px;
   padding: 1em;
   margin-top: 0.5em;
   color: white;
   cursor: pointer;
   font-size: 0.9em;
}

button:active {
   background-color: #8e239c;
}

.container-profile-user{
   display: flex;
   height: 100%;
   flex-direction: column;
   justify-content: center;
   align-items: center;
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
      margin-top: 1em;
   }
}

.container-header {
   display: flex;
   width: 100%;
   color: white;
   height: 80px;
   justify-content: center;
   align-items: center;
   background: #b128c3;
   position: relative;
}



.icon-back {
   position: absolute;
   color: white;
   margin-left: 10px;
   left: 0;
   font-size: 1.5em;
   cursor: pointer;
}

.container-header h1{
   font-size: 1.6em;
   font-weight: bold;

}



@media screen and (min-width: 700px) {
   .container-profile-user {
      height: 100%;
   }
}

@media screen and (min-width: 360px) {
   .container-top {
      font-size: 1.2em;
      margin-bottom: 1em;
   }

   .container-top h3 {
      margin: 0;
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
   height: 70px;
   object-fit: cover;
   border-radius: 100%;
}

@media screen and (min-width: 700px) {
   .profile-photo {
      width: 110px;
      height: 110px;
   }
}

.container-ul {
   width: max-content;
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
   justify-content: flex-start;
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
   cursor: pointer;
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
