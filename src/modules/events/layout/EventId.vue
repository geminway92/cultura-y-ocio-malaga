<template>
   <header>
      <div class="container-header">
         <span
            @click="this.$router.push({ name: 'eventlayout' })"
            class="fas fa-chevron-left"
         ></span>
         <h1>{{ this.eventID.name }}</h1>
      </div>
   </header>
   <article>
      <img class="img-event" :src="this.eventID.photo" alt="foto del evento" />
      <div class="info">
         <ul>
            <li><span> Id:</span> {{ this.eventID.id }}</li>
            <li><span> Día:</span> {{ this.eventID.date }}</li>
            <li><span> Horario:</span> {{ this.eventID.schedule }}</li>
            <li><span> Inscritos:</span> {{ this.eventID.joined }}</li>
         </ul>
         <details>
            <summary>Nombres Inscritos</summary>
            <ul>
               <li v-for="event in this.eventID.register" :key="event">
                  {{ event }}
               </li>
            </ul>
         </details>
      </div>
      <p class="description-event">{{ this.eventID.description }}</p>
      <button @click="this.checkUser(eventID)">Unirse</button>
   </article>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'event-id',
  data () {
    return {
      eventID: {}
    }
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions('event', ['loadEventAction', 'joinEventAction']),

    async eventId () {
      await this.loadEventAction()
      const eventNotID = Object.values(this.events)

      this.eventID = eventNotID.find(e => e.id == this.id)
    },

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

      const eventUser = { id: this.user.email, startDate: dataToSave.date, endDate: dataToSave.date, title: dataToSave.name, classes: 'purple' }
      const filter = event.register.filter(e => e === this.user.name)

      if (filter.length > 0) {
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
          title: resp.message,
          confirmButtonColor: '#B128C3'
        })
      }
      return (event.joined = event.joined + 1)
    },

    checkUser (event) {
      if (this.user.email === undefined) {
        const filterEventRepeat = this.eventRegister.filter(e => e.title === event.name)

        if (filterEventRepeat.length === 0) {
          const eventUser = { id: 'anonimo', startDate: `${event.date} ${event.schedule}:00`, endDate: `${event.date} ${event.schedule}:00`, title: event.name, classes: 'purple' }
          this.updateEventAnonimous(eventUser)
          Swal.fire({
            icon: 'success',
            title: 'Añadido al evento',
            confirmButtonColor: '#B128C3'
          })
        }
      } else {
        this.joinEvent(event)
      }
    },
  },

  created () {
    this.eventId()
  },

  computed: {
    ...mapState('event', ['events']),
    ...mapState('auth', ['user'])
  }
}
</script>

<style scoped>
h1 {
   margin: auto;
   position: relative;
   right: 0.5em;
}

details {
   margin-left: 2.5em;
   display: flex;
   text-align: start;
   color: #b865c3;
}

details ul{
   list-style: none;
}

button {
   background: #b865c3;
   border: none;
   padding: 1em;
   border-radius: 15px;
   color: #ffff;
   box-shadow: 0 0 3px black;
   cursor: pointer;
   margin-top: 1em;
}

@media screen and (width: 320px) {
   button {
      margin: 0 0 1em;
   }
}

button:active {
   background-color: #af14c4;
}

.container-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: #ffff;
   width: 100vw;
   height: 80px;
   margin: 0;
   background: #b865c3;
}

.container-header span {
   position: relative;
   left: 1em;
   font-size: 1.5em;
   cursor: pointer;
}

.container-header span:hover {
   color: white;
}

.img-event {
   width: 150px;
   object-fit: cover;
   border-radius: 5px;
   margin-top: 1em;
}

.info {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
}

.info > ul {
   width: 70%;
   list-style: none;
}

.info > ul > li {
   text-align: start;
   font-size: 1.1em;
}

.description-event {
   width: 80%;
   text-align: start;
   margin: 1em auto;
}
</style>
