<template>
   <div class="bar-botton">
      <div class="container-bar">
         <button @click="this.$emit('openModalCreateEvent')">
            Crear evento
         </button>
         <div role="button" tabindex="0" @click="goRouteCalendar()" title="Calendario" class="far fa-calendar-alt button-icon"></div>
         <div role="button" tabindex="0" v-if="userLogin.name" @click="openProfile()" title="Perfil" class="fas fa-user button-icon"></div>
      </div>
   </div>
</template>

<script>
export default {
  props: {
    showCreateModal: {
      type: Boolean,
      default: false
    },
    userLogin: {
       type: Object
    }
  },
  methods: {
    openProfile () {
      this.$router.push({ name: 'profileUser' })
    },

    goRouteCalendar () {
      this.$router.push({ name: 'calendar' })
    }
  }
}
</script>

<style scoped>
button {
   background-color: var(--colorPrimary);
   border: none;
   border-radius: 15px;
   color: white;
   font-size: 1em;
   padding: 1em;
   margin: auto;
   text-align: center;
   cursor: pointer;
}

.button-icon {
   margin: auto;
   font-size: 1.3em;
}
@media screen and (width: 375px) {
   button {
      padding: 0.8em;
      position: relative;
      bottom: 0.3em;
   }
}

@media screen and (min-width: 1800px) {
   button {
      padding: 2em;
   }

   i {
      font-size: 2em;
   }
}

.container-bar {
   display: flex;
   height: 70px;
   justify-content: space-between;
   z-index: 1;
   cursor: pointer;
}

@media screen and (min-width: 1800px) {
   .container-bar {
      height: 100px;
   }
}
</style>
