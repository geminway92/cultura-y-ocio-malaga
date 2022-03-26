<template>
   <div class="container-next-event">
      <div class="container-slider">
         <div
            v-for="event in updateEvent"
            :key="event"
            class="container-card"
            data-testid="container-event"
            :style="styleBackground"
         >
            <div class="container-img">
               <img v-if="event.photo" :src="event.photo" alt=""/>
               <img
                  v-else
                  src="../../../assets/images/categoria-sin-nombre.jpg"
                  alt=""
               />
            </div>
            <div class="container-flex">
               <div class="container-h">
                  <h1 class="subtitle-date">{{ event.date }}</h1>
                  <h2>{{ event.name }}</h2>
                  <p>{{ event.description.substring(0, 30) + '...' }}</p>
               </div>
               <div class="container-total-people">
                  <div
                     @click="this.$emit('openModalName', event.register)"
                     v-if="event.joined > 0"
                     class="container-count-people"
                     data-testid="container-name-register"
                  >
                     <h3>+{{ event.joined }}</h3>
                     <p>Inscritos</p>
                  </div>
                  <div class="container-buttons">
                     <button
                        class="button-show"
                        @click="this.$emit('openModal', event)"
                     >
                        Ver
                     </button>
                     <button class="button-join" @click="checkUser(event)">
                        Unir
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div v-if="this.updateEvent.length === 0" class="container-no-events">
            <h1>No hay eventos</h1>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
    }
  },

  props: {
    filterMonthEvent: {
      type: Array
    },
    monthLetter: {
      type: String
    },
    titleCurrent:{
       type: String
    },
    styleBackground:{
       type: Object
    }
   },

  methods: {
    ...mapActions('event', ['joinEventAction', 'loadEventAction', 'updateEventAnonimous']),

    async joinEvent (event) {
      const dataToSave = {
        id: event.id,
        name: event.name,
        schedule: event.schedule,
        date: event.date,
        description: event.description,
        photo: event.photo,
        joined: event.joined,
        register: event.register
      }

      const eventUser = { id: this.user.email, startDate: `${dataToSave.date} ${dataToSave.schedule}:00`, endDate: `${dataToSave.date} ${dataToSave.schedule}:00`, title: dataToSave.name, classes: 'purple' }
      const registerUserValue =  Object.values(dataToSave.register)
      const filter = registerUserValue.filter(e => e === this.user.name)

      typeof(dataToSave.register)

      if (filter.length > 0) {
         Swal.fire({
          icon: 'error',
          title: 'Estabas inscrito',
          confirmButtonColor: '#B128C3'
        })

        return
      }
      dataToSave.joined = event.joined + 1
      event.register.push(this.user.name)

      const resp = await this.joinEventAction({ dataToSave, eventUser })

      if (!resp.ok) {
        Swal.fire({
          icon: 'error',
          title: resp.message,
          confirmButtonColor: '#B128C3'
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Añadido al calendario',
          confirmButtonColor: '#B128C3'
        })

      }

      event.joined = event.joined + 1
    },

    checkUser (event) {
      if (this.user.email === undefined) {

        const filterEventRepeat = this.eventRegister.filter(e => e.title === event.name)

        if (filterEventRepeat.length === 0) {

           const eventUser = { id: 'anonimo', startDate: event.date, endDate: event.date, title: event.name, classes: 'purple' }
          this.updateEventAnonimous(eventUser)

          Swal.fire({
             icon: 'success',
            title: 'Añadido al calendario',
            confirmButtonColor: '#B128C3'
          })
        }else {
         Swal.fire({
          icon: 'error',
          title: 'Estabas inscrito',
          confirmButtonColor: '#B128C3'
        })
        }
      } else {
        this.joinEvent(event)
      }
    },
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('event', ['events', 'eventRegister']),

    updateEvent () {
      return this.filterMonthEvent /* Para que actualice el filtro de eventos por mes si se registra uno */
    }
  },
}
</script>

<style scoped>
p {
   margin: 0.3em;
   width: 280px;
   font-size: 1em;
}

@media screen and (width: 320px) {
   p {
      width: 150px;
   }
}

@media screen and (min-width: 360px) {
   p {
      width: 90%;
   }
}

.container-next-event{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}

.container-slider::-webkit-scrollbar-track {
    height: 5px;
    background-color: #f2f2f2;
    margin: 1em;
}
.container-slider::-webkit-scrollbar {
    height: 10px;
}
.container-slider::-webkit-scrollbar-thumb {
    background-color: #B128C3; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
}
.container-next-event{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}

.container-slider {
   width: 90%;
   display: flex;
   overflow-x: scroll;
   margin: auto ;
   gap: 1em;
}

@media screen and (min-width: 1000px) {
   .container-slider::-webkit-scrollbar-track {
      background-color: transparent;
      overflow-x: initial;
   }
   .container-slider {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
   }
}

.container-card {
   display: flex;
   width: 350px;
   border-radius: 1em;
}

.container-img{
   width: 200px;
}

img {
   width: 100%;
   height: 100%;
   border-radius: 15px;
   object-fit: cover;
}

.container-card h2 {
   width: 200px;
   font-size: 1.2em;
   text-align: start;
   margin-left: 0.5em;
}

.container-flex {
   display: flex;
   flex-direction: column;
   width: 300px;
   background-color: #ffe60015;
   text-align: start;
}


.subtitle-date {
   margin: 0;
   font-size: 1em;
   color: var(--colorSecundary);
   margin: 0.2em 0.6em;
}


.container-total-people {
   display: flex;
   flex-direction: column;
   width: 80%;
}

.container-count-people {
   display: flex;
   width: 25px;
   height: 25px;
   border-radius: 100%;
   border: 2px solid var(--colorPrimary);
   gap: 1.5em;
   margin-left: 0.3em;
   background-color: #ffffff;
}

.container-count-people h3 {
   font-size: 0.8em;
   font-weight: bold;
   margin: auto;
   left: 0.4em;
   position: relative;
   width: min-content;
   cursor: pointer;
}

.container-total-people button {
   border-radius: 15px;
   width: 50px;
   border: none;
   color: #ffffffea;
   font-weight: bolder;
   padding: 0.5em;
   cursor: pointer;
}

.container-buttons {
   display: flex;
   justify-content: center;
   margin: auto;
   margin-bottom: 0.3em;
   gap: 1em;
}

.container-button--anonimous {
   margin: auto;
   margin-bottom: 0.3em;
   width: min-content;
}

.button-join {
   background-color: var(--colorPrimary);
}

.button-show {
   font-weight: bold;
   font-size: 1em;
   background-color: var(--colorSecundary);
}

.container-no-events {
   font-size: 1em;
   margin: 0;
   margin-left: 0.5em;
   text-align: center;
   width: 100%;
   background-color: #ffe60015;
}
</style>
