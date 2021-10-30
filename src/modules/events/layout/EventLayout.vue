<template>
  <div class="eventlayout">
    <!-- Modal de event -->
      <EventModal @openModal="openModal"  v-if="openModalIsTrue" :eventForModal="eventForModal"/>
    
    <!-- Modal Create event -->
      <CreateEventModal 
        v-if="showCreateModal" 
        @openModalCreateEvent="openModalCreateEvent" 
        :showCreateModal="showCreateModal"
        @createNewEvent="createNewEvent"
      />

    <!-- Header -->
    <div class="container-header">
      <div class="container-search">
        <i class="fas fa-search"></i>
      </div>
      <img v-if="user.profilePicture" :src="user.profilePicture" alt="">
      <img v-else src="" alt="">
      <div class="container-logout">
        <i @click="onLogout" class="fas fa-sign-out-alt"></i>
      </div>
    </div>

    <!-- Slider -->
    <div class="container-slider">
      <CurrentEvent 
        @openModal="openModal"
        :filterMonthEvent="filterMonthEvent"
        :monthLetter="monthLetter"/>
    </div>
    
    <!-- Popular Event -->
    <div class="container-slider-2">
      <PopularEvent />
    </div>
    
    <div class="container-bar">
      <BarBotton 
        @openModalCreateEvent="openModalCreateEvent" 
        :showCreateModal="showCreateModal"
      />
    </div>    

    
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {defineAsyncComponent} from 'vue'
import getDayMonthYear from "../helpers/getMonthYear";
import Swal from 'sweetalert2'

export default {
  name: 'eventlayout',
  components: {
    CurrentEvent: defineAsyncComponent( () => import('../components/CurrentEvent.vue')),
    PopularEvent: defineAsyncComponent( () => import('../components/PopularEvent.vue')),
    BarBotton: defineAsyncComponent( () => import('../components/BarBotton.vue')),
    EventModal: defineAsyncComponent( () => import('../components/EventModal.vue')),
    CreateEventModal: defineAsyncComponent( () => import('../components/CreateEventModal.vue'))
  },

  data(){
    return{
      openModalIsTrue: false,
      eventForModal: null,
      showCreateModal: false,
      newEvent: '',
      filterMonthEvent: '',
      currentMonth: null,
      monthLetter: null
    }
  },

  methods:{
    ...mapActions('auth',['logout']),
    ...mapActions('event',['loadEventAction']),

    onLogout(){
      this.logout()
      this.$router.push({name: 'login'})
    },

    openModal(event){
      this.openModalIsTrue = !this.openModalIsTrue
      console.log(this.openModalIsTrue)

      this.eventForModal = event
      console.log(this.eventForModal)

    },

    openModalCreateEvent(){
      this.showCreateModal = !this.showCreateModal
      console.log(this.showCreateModal)
    },

    async createNewEvent(events){
      this.newEvent = events
      const {ok, message} = await this.$store.dispatch('event/createEvent', this.newEvent)

      if(ok )Swal.fire({
        icon: 'success',
        title: message,
        confirmButtonColor: '#B128C3',
      })
      else Swal.fire({
        icon: 'error',
        title: message,
        confirmButtonColor: '#B128C3',
      })
    },

     month(){
      const {monthCurrent, year, month} = getDayMonthYear()
      this.monthLetter = month
      
      this.currentMonth = `${year}-${monthCurrent}`
      console.log(this.currentMonth)
    },

    async loadEvents(){
      const resp = await this.loadEventAction()
  
      const eventArray = Object.values(resp) /*Los paso a array para eliminar el idToken que crea firebase */

      const newObject = Object.assign(eventArray) /*Paso a objeto de nuevo */
    

      console.log('ha llegado de la accion', newObject)

      this.filterMonthEvent = newObject.filter(e => e.date.includes(this.currentMonth))

      console.log(this.filterMonthEvent, 'filtermonth')

    },



  },
  created(){    
    this.loadEvents()
    this.month()
  },

  computed:{
    ...mapState('auth',['user']),

  }

}
</script>

<style scoped>

i{
  font-size: 1.3em;
}

.eventlayout{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container-header{
  width: 100vw;
  display: flex;
  /* position: fixed; */
  top: 0;
  justify-content: space-between;
  padding: .5em 0;
  z-index: 3;
}

.container-header img{
  width: 40px;
  border-radius: 100%;
}

.container-search,
.container-logout {
  background-color: #F3F3F4;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container-search {
  margin-left: .5em;
}

.container-logout {
  margin-right: .5em;
}

.container-slider{
  position: relative;
  bottom: 1em;
}

.container-bar{
  /* position: sticky; */
  width: 100%;
  height: min-content;
}
</style>