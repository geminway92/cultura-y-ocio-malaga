<template>
   <div class="eventlayout">
      <!-- Modal de event -->
      <EventModal
         @openModal="openModal"
         v-if="openModalIsTrue"
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
      <div v-if="!this.searchEvent" class="container-header">
         <div @click="this.openSearchModal()" class="container-search">
            <i class="fas fa-search"></i>
         </div>
         <img v-if="user.profilePicture" :src="user.profilePicture" alt="" />
         <img v-else src="" alt="" />
         <div class="container-logout">
            <i @click="onLogout" class="fas fa-sign-out-alt"></i>
         </div>
      </div>
      <div v-else class="container-header--search">
         <div
            @click="this.openSearchModal()"
            class="container-search search-input"
         >
            <span class="fas fa-search search-icon"></span>
         </div>
         <input type="search" v-model="this.textSearch" />
      </div>

      <!-- Modal for search Events -->
      <ListEventsModal
         :openModalSearch="openModalSearch"
         :eventFilter="eventFilter"
         :searchEventFilter="searchEventFilter"
      />

      <!-- Slider -->
      <div class="container-slider">
         <CurrentEvent
            @openModal="openModal"
            @openModalName="openModalName"
            :modalNameIsTrue="modalNameIsTrue"
            :filterMonthEvent="filterMonthEvent"
            :monthLetter="monthLetter"
            :currentEmail="currentEmail"
         />
      </div>

      <!-- Popular Event -->
      <div class="container-slider-2">
         <PopularEvent :filterPopularEvent="filterPopularEvent" />
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
import { mapActions, mapState } from 'vuex';
import { defineAsyncComponent } from 'vue';
import getDayMonthYear from '../helpers/getMonthYear';
import Swal from 'sweetalert2';

export default {
   name: 'eventlayout',
   components: {
      CurrentEvent: defineAsyncComponent(() =>
         import('../components/CurrentEvent.vue')
      ),
      PopularEvent: defineAsyncComponent(() =>
         import('../components/PopularEvent.vue')
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

   data() {
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

      };
   },

   methods: {
      ...mapActions('auth', ['logout']),
      ...mapActions('event', ['loadEventAction','loadEventUser','loadEventAnonimous', 'updateEventAnonimous', 'resetState']),

      openSearchModal() {
         this.searchEvent = !this.searchEvent;
         if (this.searchEvent) {
            if (this.openModalSearch && !this.searchEvent) {
               this.openModalIsTrue = true;
            } else {
               this.textSearch = '';
            }
         } else {
            this.textSearch = '';
         }
      },

      onLogout() {
         this.logout();
         this.resetState();
         this.$router.push({ name: 'login' });
      },

      openModal(event) {
         this.openModalIsTrue = !this.openModalIsTrue;
         this.eventForModal = event;
      },

      openModalCreateEvent() {
         this.showCreateModal = !this.showCreateModal;
         this.searchEvent = true; //* I strengthen the true to close and reset the input.
         this.openSearchModal();
      },

      async createNewEvent(events) {
         this.newEvent = events;
         const { ok, message } = await this.$store.dispatch(
            'event/createEvent',
            this.newEvent
         );

         if (ok)
            Swal.fire({
               icon: 'success',
               title: message,
               confirmButtonColor: '#B128C3'
            });
         else
            Swal.fire({
               icon: 'error',
               title: message,
               confirmButtonColor: '#B128C3'
            });

         this.loadEvents();
      },

      month() {
         const { monthCurrent, year, month } = getDayMonthYear();
         this.monthLetter = month;

         this.currentMonth = `${year}-${monthCurrent.toString().length < 2 ? "0" + monthCurrent : monthCurrent}`;
      },

      async loadEvents() {
         await this.loadEventAction();

         this.filterForCurrentMonth();
      },

      filterForCurrentMonth() {
         if (null === this.events)
            return; /*Al estilo yoda así por error no se cambia de valor */
         const eventArray = Object.values(
            this.events
         ); /*Los paso array para eliminar el idToken que crea firebase */

         this.filterMonthEvent = eventArray.filter(e =>
            e.date.includes(this.currentMonth)
         );

         this.filterForPopularEvent(this.filterMonthEvent);
      },

      filterForPopularEvent(event) {
         const mapJoined = this.filterMonthEvent.map(
            e => e.joined
         ); /*Mapeamos todos los inscritos */
         mapJoined.sort(
            (a, b) => b - a
         ); /*Ordanamos los inscritos de mayor a menor */
         const [
            pos1,
            ...other
         ] = mapJoined; /*destructuramos el primero que nos interesa por ser el más grande */

         this.filterPopularEvent = event.filter(
            e => e.joined === pos1
         ); /*Filtramos el que coincide con el mayor de todos */
      },

      openModalName(name) {
         this.modalNameIsTrue = !this.modalNameIsTrue;
         this.nameRegister = name;
      },
      loadEventFirebase(){
         if(this.eventRegister.length === 0){
            console.log(this.eventRegister)

            if(  undefined === this.user.email){
               this.checkLocalStorage();
               return
            }
            console.log('prueba',this.currentEmail)
            this.loadEventUser(this.currentEmail)
         }

      },
      checkLocalStorage() {
         if (localStorage.getItem("myEvents") != null) {
         const eventsLocalStorage = JSON.parse(localStorage.getItem("myEvents"));
            return  this.loadEventAnonimous( eventsLocalStorage);
         }
      },
      currentEmailUser(){
         console.log('currentemail')
         if(this.user === null){
            this.currentEmail = localStorage.getItem('currentUser')
         }else {
            if(this.user.email === undefined ){
               this.loadEventFirebase();
               return
            }
            let emailSplit = this.user.email.split('@').shift()
            localStorage.setItem('currentUser', emailSplit)
            this.currentEmail = emailSplit
               this.loadEventFirebase();

         }
      }
   },

   created() {
      this.loadEvents();
      this.month();
      this.currentEmailUser()
   },

   computed: {
      ...mapState('auth', ['user']),
      ...mapState('event', ['events', 'eventRegister']),

      searchEventFilter() {
         if (this.textSearch.length >= 1) {
            this.openModalSearch = true;
            const eventArray = Object.values(this.events); //* Convert to array to remove id

            this.eventFilter = eventArray.filter(e =>
               e.name
                  .toLowerCase()
                  .includes(this.textSearch.toLocaleLowerCase())
            );
         } else if (this.textSearch == 0) {
            this.openModalSearch = false;
            return (this.eventFilter = []);
         }

         return this.eventFilter;
      },

   }
};
</script>

<style scoped>
i {
   font-size: 1.3em;
   cursor: pointer;
}

@media screen and (min-width: 1800px) {
   i {
      font-size: 2em;
   }
}

.eventlayout {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
}

.container-header {
   width: 100vw;
   display: flex;
   /* position: fixed; */
   top: 0;
   justify-content: space-between;
   padding: 0.5em 0;
   z-index: 3;
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

.container-header--search {
   width: 100vw;
   min-height: 40px;
   display: flex;
   z-index: 5;
   margin: 0.5em 0;
}

@media screen and (min-width: 700px) and (max-width: 900px) {
   .container-header--search {
      margin-bottom: 1em;
      min-height: 70px;
   }
}

.container-header--search input {
   width: 300px;
   height: 40px;
   border-radius: 5px;
   border: 2px solid #a4a3a1;
   padding: 0.5em;
}

.container-header--search input:focus {
   outline: 1px solid #b128c3;
}

.search-icon {
   margin: auto;
   font-size: 1.2em;
   cursor: pointer;
}

.search-input {
   margin-right: 0.2em;
   position: relative;
   top: 0.1em;
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
   position: relative;
   bottom: 1em;
}

.container-bar {
   width: 100%;
   height: min-content;
}
</style>
