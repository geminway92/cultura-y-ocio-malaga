<template>
   <div class="eventlayout">
      <!-- Modal de event -->
      <EventModal
         @openModal="openModal"
         :openModalIsTrue="openModalIsTrue"
         :eventForModal="eventForModal"
      />

      <!-- Modal Create event -->
      <CreateEventModal
          v-if="showCreateModal"
         @openModalCreateEvent="openModalCreateEvent"
         :showCreateModal="showCreateModal"
         @createNewEvent="createNewEvent"
      />

      <!-- Modal Ver Evento del mes -->
      <ModalNameRegister
        v-if="modalNameIsTrue"
        @openModalName="openModalName"
        :modalNameIsTrue="modalNameIsTrue"
        :nameRegister="nameRegister"
      />
      <!-- Header -->
      <div class="container-header">
         <button @click="this.openSearchModal()" class="container-search" data-testid="lupa-icon">
            <span class="fas fa-search"></span>
         </button>
        <div class="container-img-logout">
          <div v-if="this.searchEvent" class="container-form">
          <form  class="search-input">
            <input placeholder="Escribe el nombre del evento" type="search" v-model="this.textSearch" />
          </form>
      <!-- Modal for search Events -->
         <ListEventsModal
         class="listEventModal"
         :openModalSearch="openModalSearch"
         :eventFilter="eventFilter"
         :searchEventFilter="searchEventFilter"
        />
         </div>

         <img :src="user.profilePicture" alt="Foto perfil" />
         <button @click="onLogout" class="container-logout">
            <span class="fas fa-sign-out-alt"></span>
         </button>
        </div>

      </div>

      <!-- Slider -->
      <div class="container-slider">
      <h2 class="title">Próximos Eventos en <span class="purple">{{monthLetter}}</span></h2>
         <CurrentEvent
            @openModal="openModal"
            @openModalName="openModalName"
            :modalNameIsTrue="modalNameIsTrue"
            :filterMonthEvent="filterMonthEvent"
            :currentEmail="currentEmail"
         />
      </div>
      <!-- Slider  -->
      <div class="container-slider">
      <h2 class="title">Eventos Populares</h2>
         <CurrentEvent
            @openModal="openModal"
            @openModalName="openModalName"
            :modalNameIsTrue="modalNameIsTrue"
            :filterMonthEvent="filterPopularEvent"
            :monthLetter="monthLetter"
            :currentEmail="currentEmail"
            :styleBackground="styleBackground"
         />
      </div>

      <div class="container-bar">
         <BarBotton
            @openModalCreateEvent="openModalCreateEvent"
            :showCreateModal="showCreateModal"
            :userLogin="user"
         />
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { defineAsyncComponent } from 'vue'
import getDayMonthYear from '../helpers/getMonthYear'
import Swal from 'sweetalert2'

export default {
  name: 'eventlayout',
  components: {
    CurrentEvent: defineAsyncComponent(() =>
      import('../components/CurrentEvent.vue')
    ),
    BarBotton: defineAsyncComponent(() =>
      import('../components/BarBotton.vue')
    ),
    EventModal: defineAsyncComponent(() =>
      import('../components/EventModal.vue')
    ),
    CreateEventModal: defineAsyncComponent(() =>
      import('../components/CreateEventModal.vue')
    ),
    ModalNameRegister: defineAsyncComponent(() =>
      import('../components/ModalNameRegister.vue')
    ),
    ListEventsModal: defineAsyncComponent(() =>
      import('../components/ListEventsModal.vue')
    )
  },

  data () {
    return {
      openModalIsTrue: false,
      eventForModal: null,
      showCreateModal: false,
      filterMonthEvent: [],
      currentMonth: null,
      monthLetter: null,
      newEvent: null,
      filterPopularEvent: [],
      modalNameIsTrue: false,
      openModalSearch: false,
      nameRegister: null,
      searchEvent: false,
      textSearch: '',
      eventFilter: [],
      myEvents: [],
      currentEmail: '',
      styleBackground: {
        backgroundColor: '#fffdea',
      },
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('event', ['loadEventAction', 'loadEventUser', 'loadEventAnonimous', 'updateEventAnonimous', 'resetState']),

    openSearchModal () {
      this.searchEvent = !this.searchEvent
      if (this.searchEvent) {
        if (this.openModalSearch && !this.searchEvent) {
          this.openModalIsTrue = true
        } else {
          this.textSearch = ''
        }
      } else {
        this.textSearch = ''
      }
    },

    onLogout () {
      this.logout()
      this.resetState()
      this.$router.push({ name: 'login' })
    },

    openModal (event) {
      this.openModalIsTrue = !this.openModalIsTrue
      this.eventForModal = event
    },

    openModalCreateEvent () {
      this.showCreateModal = !this.showCreateModal
      this.searchEvent = true
      this.openSearchModal()
    },

    async createNewEvent (events) {
      this.newEvent = events
      const { ok, message } = await this.$store.dispatch(
        'event/createEvent',
        this.newEvent
      )

      if (ok) {
        Swal.fire({
          icon: 'success',
          title: message,
          confirmButtonColor: '#B128C3'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: message,
          confirmButtonColor: '#B128C3'
        })
      }

      this.loadEvents()
    },

    month () {

      const { monthCurrent, year, month } = getDayMonthYear()
      this.monthLetter = month

      this.currentMonth = `${year}-${monthCurrent.toString().length < 2 ? '0' + monthCurrent : monthCurrent}`
    },

    async loadEvents () {

      await this.loadEventAction()

      this.month()

      this.filterForCurrentMonth()
    },

    filterForCurrentMonth () {
      if (this.events === null) { return }
      const eventArray = Object.values(
        this.events
      ) /* Los paso array para eliminar el idToken que crea firebase */

      this.filterMonthEvent = eventArray.filter(e =>
        e.date.includes(this.currentMonth)
      )
      this.sortEvents(this.filterMonthEvent)
    },

    sortEvents(event) {
      /* Buscar los que tienen más de 0 joined */
      const filterEventJoined = event.filter(e => e.joined > 0)
      if (filterEventJoined.length > 0) {
        this.filterPopularEvent = filterEventJoined.sort((a, b) => b.joined - a.joined);
        (this.filterPopularEvent = filterEventJoined.length > 2 ? this.filterPopularEvent.splice(0, 2) : this.filterPopularEvent)
      }
    },

    openModalName (name) {
      this.modalNameIsTrue = !this.modalNameIsTrue
      this.nameRegister = name
    },
    async loadEventFirebase () {
      if (this.eventRegister.length === 0) {
        if (this.user.email === undefined) {

          this.checkLocalStorage()
          return
        }

        await this.loadEventUser(this.currentEmail)
      }
    },
    checkLocalStorage () {
      if (localStorage.getItem('myEvents') != null) {
        const eventsLocalStorage = JSON.parse(localStorage.getItem('myEvents'))
        return this.loadEventAnonimous(eventsLocalStorage)
      }
    },

    currentEmailUser () {
      if (this.user === null) {
        this.currentEmail = localStorage.getItem('currentUser')
      } else {


        const emailSplit = this.user.email.split('@').shift()
        localStorage.setItem('currentUser', emailSplit)
        this.currentEmail = emailSplit
        this.loadEventFirebase()
      }
    }
  },

  created () {
    this.loadEvents()
    this.currentEmailUser()
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('event', ['events', 'eventRegister']),

    searchEventFilter () {

      if (this.textSearch.length >= 1) {
        this.openModalSearch = true
        const eventArray = Object.values(this.events) //* Convert to array to remove id

        this.eventFilter = eventArray.filter(e =>
          e.name
            .toLowerCase()
            .includes(this.textSearch.toLocaleLowerCase())
        )
      } else if (this.textSearch == 0) {
        this.openModalSearch = false
        return (this.eventFilter = [])
      }

      return this.eventFilter
    },

  }
}
</script>

<style scoped>
span {
   font-size: 1.3em;
   cursor: pointer;
}

@media screen and (min-width: 1800px) {
   span {
      font-size: 2em;
   }
}
button{
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.purple{
  color: #b128c3;
}
.title {
  font-size: 1.5em;
}

.eventlayout {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
}

.container-header {
  display: flex;
   width: 100vw;
   align-items: center;
   justify-content: space-between;
   padding: 0.3em 0;
   z-index: 3;
   position: relative;
}

.container-form{
  display: flex;
  min-width: 300px;
  flex-direction: column;
  align-items: center;
  position:absolute;
}

@media screen and (min-width: 320px){
  .container-form{
    top: 3.1em;
    left: 0;
    right: 0;
  }

  .search-input{
    width: 100%;
    left: 0;
    right: 0;
  }

  .search-input input{
    width: 100%;
    border-radius: 5px;
    border: 2px solid #a4a3a1;
    padding: 0.5em;
  }
}

@media screen and (min-width: 620px){
  .container-form{
    top: 3.1em;
    width: 50%;
    left: 0.5em;
  }

  .search-input input{
    width: 100%;
    border-radius: 5px;
    border: 2px solid #a4a3a1;
    padding: 0.5em;
  }

}

@media screen and (min-width: 1800px) {
   .container-header {
      height: 70px;
   }
}

.container-header img {
   width: 40px;
   object-fit: cover;
   border-radius: 100%;
}

@media screen and (min-width: 1800px) {
   .container-header img {
      width: 60px;
   }
}

.search-input {
  display: flex;
  height: 40px;
}

.search-input input{
  min-width: 300px;
  border-radius: 5px;
  border: 2px solid #a4a3a1;
  padding: 0.5em;
}


.search-input input:focus {
   outline: 1px solid #b128c3;
}

.container-search,
.container-logout {
   background-color: #f3f3f4;
   width: 40px;
   height: 40px;
   border-radius: 100%;
   display: flex;
   justify-content: center;
   flex-direction: column;
}
.container-img-logout{
  display: flex;
  width: 53%;
  justify-content: space-between;
}

@media screen and (min-width: 1800px) {
.container-search,
.container-logout {
  width: 50px;
  height: 50px;
  }
}

.container-search {
   margin-left: 0.5em;
}

.container-logout {
   margin-right: 0.5em;
}

.container-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.container-bar {
  width: 100%;
  height: min-content;
}
</style>
