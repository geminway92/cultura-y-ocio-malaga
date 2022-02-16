<template>
   <div class="container-popular-event">
      <!-- Modal Popular -->
      <PopularModal
         v-if="openPopularModal"
         :openPopularModal="openPopularModal"
         @showEvent="showEvent"
         :event="event"
      />
      <!-- Modal NameRegister -->
      <ModalNameRegisterInPopularEvent
         v-if="openNameRegister"
         @showNameRegister="showNameRegister"
         :openNameRegister="openNameRegister"
         :nameRegister="nameRegister"
      />

      <h1  class="title">Eventos Populares</h1>
      <div class="container-show" v-if="filterPopularEvent.length > 0 " >
         <div class="container-card" v-for="event in filterPopularEvent" :key="event" >
            <div class="container-img">
               <img :src="event.photo" alt="" />
            </div>
            <div class="container-content">
               <h4>{{ event.date }}</h4>
               <h2>{{ event.name }}</h2>
               <p>
                  {{ event.description.substring(0, 27) + '...' }}
               </p>
               <div class="container-total-people">
                  <div class="container-count-people">
                     <h4 @click="showNameRegister()">
                        +{{ event.joined }}
                     </h4>
                     <h4>Inscritos</h4>
                  </div>
                  <div class="container-buttons">
                     <button @click="getEventInterested(event)" class="button-show">Ver</button>
                     <button
                        @click="checkUser(event)"
                        class="button-join"
                     >
                        Unir
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div
         v-if="this.filterPopularEvent.length === 0"
         class="container-no-events"
      >
         <h1>No hay eventos</h1>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { defineAsyncComponent } from 'vue';

export default {
   components: {
      PopularModal: defineAsyncComponent(() =>
         import('../components/PopularModal.vue')
      ),
      ModalNameRegisterInPopularEvent: defineAsyncComponent(() =>
         import('../components/ModalNameRegisterInPopularEvent.vue')
      )
   },
   data() {
      return {
         openPopularModal: false,
         openNameRegister: false,
         event: [],
         nameRegister: {}
      };
   },

   props: {
      filterPopularEvent: {
         type: Array
      }
   },

   methods: {
      ...mapActions('event', ['joinEventAction', 'updateEventAnonimous']),

      getEventInterested(event) {
         this.$emit('openModal', event);
      },

      async joinEvent(event) {
         console.log('entra en populares')
         const dataToSave = {
            id: event.id,
            name: event.name,
            schedule: event.schedule,
            date: event.date,
            description: event.description,
            photo: event.photo,
            joined: event.joined,
            register: event.register
         };

         const eventUser = {id: this.user.email ,startDate: dataToSave.date,endDate: dataToSave.date,title: dataToSave.name,classes: "purple",}
         const filter = event.register.filter(e => e === this.user.name);

         if (filter.length > 0) {
            return;
         }
         dataToSave.joined = event.joined + 1;
         event.register.push(this.user.name);

         await this.joinEventAction({dataToSave, eventUser});

         return (event.joined = event.joined + 1);
      },
      checkUser(event){
         if(this.user.email === undefined){
            const filterEventRepeat = this.eventRegister.filter(e => e.title === event.name )

            if(filterEventRepeat.length === 0){
               const eventUser = {id: 'anonimo' ,startDate: event.date,endDate: event.date,title: event.name,classes: "purple"}
               this.updateEventAnonimous(eventUser)
            }

         }else {
            this.joinEvent(event);
         }
      },

      showNameRegister() {
         this.openNameRegister = !this.openNameRegister;
         this.nameRegister = this.filterPopularEvent[0].register;
      },

   },

   computed: {
      ...mapState('auth', ['user']),
      ...mapState('event', ['events', 'eventRegister']),
   },
};
</script>

<style scoped>
.container-popular-event {
   height: min-content;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
}

.container-show{
   width: 90%;
   display: flex;
}
.title {
   font-size: 1.5em;
   text-align: start;
   width: 200px;
   margin: 0 1em;
}

.container-card {
   background-color: #ffe60015;
   width: 250px;
   height: min-content;
   margin: 1em;
   display: flex;
}
@media screen and (width: 375px) {
   .container-card {
      margin: 0 1em;
   }
}

@media screen and (width: 320px) {
   .container-card {
      height: 150px;
   }
}

@media screen and (min-width: 730px) {
   .container-card {
      width: 500px;
      margin: auto;
      margin-top: 2em;
   }
}

@media screen and (min-width: 1800px) {
   .container-card {
      width: 400px;
   }
}

.container-img {
   width: 250px;
}

@media screen and (width: 320px) {
   .container-img {
      width: 100%;
      height: 100%;
   }
}

.container-img img {
   width: 100%;
   height: 100%;
   border-radius: 15px;
   object-fit: cover;
}

@media screen and (min-width: 1800px) {
   .container-img {
      margin: 1em;
   }
}

.container-content {
   width: 100%;
   height: 100%;
   text-align: start;
}

@media screen and (width: 320px) {
   .container-content {
      display: flex;
      flex-direction: column;
   }
}

@media screen and (min-width: 1800px) {
   .container-content {
      width: 90%;
      margin: auto;
   }
}

.container-content h4 {
   color: var(--colorSecundary);
   margin: 0;
   margin-left: 0.3em;
}

.container-content h2 {
   font-size: 1em;
   position: relative;
   bottom: 0.5em;
   width: 150px;
   margin-left: 0.3em;
}

.container-content p {
   position: relative;
   bottom: 1.2em;
   font-size: 0.9em;
   margin-left: 0.3em;
}

@media screen and (width: 320px) {
   .container-content p {
      margin: 0;
      margin-left: 0.3em;
   }
}

@media screen and (width: 320px) {
   .container-total-people {
      position: relative;
      bottom: 1em;
   }
}

.container-count-people {
   display: flex;
   width: 25px;
   height: 25px;
   border-radius: 100%;
   border: 2px solid var(--colorPrimary);
   position: relative;
   gap: 1.1em;
   background-color: #ffffff;
   margin-left: 0.3em;
   margin-bottom: 0.5em;
}

.container-count-people h4 {
   font-size: 0.8em;
   margin: auto;
   left: 0.4em;
   position: relative;
   width: min-content;
   color: black;
   cursor: pointer;
}

.container-total-people button {
   border-radius: 15px;
   width: 50px;
   border: none;
   color: #ffffffea;
   font-weight: lighter;
   padding: 0.5em;
   cursor: pointer;
}

.button-join {
   background-color: var(--colorPrimary);
}

.button-show {
   background-color: var(--colorSecundary);
}

.container-buttons {
   display: flex;
   gap: 1em;
   justify-content: center;
   margin-bottom: 0.5em;
}

.container-button--anonimous {
   margin: auto;
   margin-bottom: 0.3em;
   width: min-content;
}

@media screen and (width: 320px) {
   .container-buttons {
      width: min-content;
      margin: auto;
      margin-top: 0.3em;
      gap: 0.5em;
   }
}

.container-no-events {
   font-size: 1em;
   margin: 1em;
   width: 90%;
   min-height: 300px;
   background-color: #ffe60015;
   justify-content: center;
}

.container-no-events h1 {
   padding: 0.7em;
}
</style>
