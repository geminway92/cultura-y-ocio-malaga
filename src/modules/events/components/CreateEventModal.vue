<template>
   <div
      @click.self="this.$emit('openModalCreateEvent')"
      class="container-modal"
   >
      <div class="modal">
         <form class="form" @submit="onSubmit" @input="validateForm">
            <h1>Crear evento</h1>
            <label for="name-input">Nombre</label>
            <input
               id="name-input"
               type="text"
               placeholder="Nombre del evento"
               v-model="this.newEvent.name"
               aria-required="true"
               required
            />
            <label for="time-input">Hora</label>
            <input
               id="time-input"
               type="time"
               placeholder="Horario"
               v-model="this.newEvent.schedule"
               aria-required="true"
               required
            />

            <label for="date">Fecha</label>
            <input
               id="date"
               type="date"
               min="2022"
               v-model="this.newEvent.date"
               aria-required="true"
               required
            />
            <label for="file-input">Imagen</label>
            <input
               id="file-input"
               type="file"
               @change="onSelectedImage"
               accept="image/*"
               aria-required="true"
               required
            />
            <label for="description-input">Descripción</label>
            <textarea
               id="description-input"
               cols="30"
               rows="10"
               placeholder="Describe el evento..."
               v-model="this.newEvent.description"
               aria-required="true"
               minlength="35"
               required
            >
            </textarea>
            <button :disabled="isDisabledButton"  type="submit">Crear</button>
         </form>
      </div>
   </div>
</template>

<script>
import uploadImage from '../helpers/updatePhoto'

export default {
  data () {
    return {
      newEvent: {
        name: '',
        schedule: '',
        date: '',
        description: '',
        photo: '',
      },
      isDisabledButton: true
    }
  },

  props: {
    showCreateModal: {
      type: Boolean,
      default: false
    }
  },

  methods: {
     validateForm(){
      const {name, schedule, date, description,photo} = this.newEvent
      if(name && schedule && date && description && photo){
         this.isDisabledButton = false
      }
     },

    async onSubmit () {
      const date = new Date() /* Fecha actual */
      const id = date.getTime() /* se usa para crear una id única */

      this.newEvent.id = id
      this.newEvent.photo = this.file

      this.$emit('createNewEvent',this.newEvent)
      this.$emit('openModalCreateEvent') /* Cierra modal */

      /* Resetea formulario */
      this.newEvent = {
        name: '',
        schedule: '',
        date: '',
        description: '',
        photo: '',
      }

      this.isDisabledButton = true
    },

    async onSelectedImage (event) {
       const file = event.target.files[0] /* Localiza la foto selecionada */
      if (!file) {
         this.file = null
        return
      }
      this.newEvent.photo = file
      this.file = file /* Cambiamos el valor de file de la data con la foto selecionada */

      const picture = await uploadImage(
        this.file
      ) /* Petición para subir el archivo a cloudinary */

      this.file = picture /* Cambiamos el valor de file por el url que nos ha devuelto en el paso anterior */
      return this.file
    }
  }
}
</script>

<style scoped>
p {
   margin: 1em;
   text-align: start;
}

h1 {
   font-size: 1.1em;
}

label{
   width: 70%;
   text-align: start;
   color: #6e6a6a;
}
textarea {
   width: 70%;
   resize: none;
   padding: 1em;
   border-radius: 15px;
   border: none;
   background-color: rgba(161, 153, 153, 0.178);
   margin-top: 10px;
}

textarea:focus {
   outline: none;
   border-bottom: 2px solid var(--colorPrimary);
}

button {
   background-color: var(--colorPrimary);
   border: none;
   border-radius: 15px;
   padding: 1em;
   width: 60px;
   margin: 1em auto;
   color: #ffffff;
   cursor: pointer;
}

.container-modal {
   background-color: rgba(116, 111, 111, 0.295);
   position: absolute;
   width: 100vw;
   height: 650px;
   z-index: 3;
   display: flex;
}

@media screen and (width: 320px) {
   .container-modal {
      height: 660px;
   }
}

@media screen and (min-width: 380px) {
   .container-modal {
      height: 100vh;
   }
}

.modal {
   background-color: #ffffff;
   width: 90%;
   height: min-content;
   margin: auto;
   border-radius: 15px;
   box-shadow: 4px 3px 4px #746f6f4b;
}

@media screen and (min-width: 1200px) {
   .modal {
      width: 550px;
   }
}

.modal::-webkit-scrollbar {
   width: 10px;
}

.modal::-webkit-scrollbar-thumb {
   border-radius: 10px;
   background-color: #ada9a9;
   width: 10px;
   height: 20px;
}

.form {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 80%;
   margin: auto;

}

.form input {
   width: 70%;
   margin-bottom: 1.5em;
   border: none;
   border-bottom: 2px solid rgba(161, 153, 153, 0.178);
   padding: 0.5em 1em;
}

.form input:focus {
   outline: none;
   border-bottom: 2px solid var(--colorPrimary);
}
</style>
