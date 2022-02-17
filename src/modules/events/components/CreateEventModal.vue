<template>
   <div
      @click.self="this.$emit('openModalCreateEvent')"
      class="container-modal"
   >
      <div class="modal">
         <form class="form" @submit.prevent="onSubmit(this.newEvent)">
            <h1>Crear evento</h1>
            <input
               type="text"
               placeholder="Nombre del evento"
               v-model="this.newEvent.name"
               required
            />

            <input
               type="time"
               placeholder="Horario"
               v-model="this.newEvent.schedule"
               required
            />

            <input
               type="date"
               min="2021"
               v-model="this.newEvent.date"
               required
            />
            <input
               type="file"
               @change="onSelectedImage"
               accept="image/png, image/jpeg image/jpg"
               required
            />

            <textarea
               cols="30"
               rows="10"
               placeholder="Describe el evento..."
               v-model="this.newEvent.description"
               required
               minlength="35"
            >
            </textarea>
            <button type="submit">Crear</button>
         </form>
      </div>
   </div>
</template>

<script>
import uploadImage from '../helpers/updatePhoto';

export default {
   data() {
      return {
         newEvent: {
            id: '',
            name: '',
            schedule: '',
            date: '',
            description: '',
            photo: '',
            joined: 0,
            register: ['']
         }
      };
   },

   props: {
      showCreateModal: {
         type: Boolean,
         default: false
      }
   },

   methods: {
      async onSubmit() {
         const date = new Date(); /*Fecha actual */
         const id = date.getTime(); /*se usa para crear una id única */

         this.newEvent.id = id;
         this.newEvent.photo = this.file; /*Pasamos el valor de la url */

         this.$emit(
            'createNewEvent',
            this.newEvent
         ); /*Envia los datos del form a otro método  que dispara la acción */
         this.$emit('openModalCreateEvent'); /*Cierra modal */

         /*Resetea formulario */
         this.newEvent = {
            id: '',
            name: '',
            schedule: '',
            date: '',
            description: '',
            photo: '',
            joined: 0,
            register: []
         };
      },

      async onSelectedImage(event) {
         const file = event.target.files[0]; /*Localiza la foto selecionada */
         if (!file) {
            this.file = null;
            return;
         }

         this.file = file; /*Cambiamos el valor de file de la data con la foto selecionada */

         const picture = await uploadImage(
            this.file
         ); /*Petición para subir el archivo a cloudinary */

         this.file = picture; /*Cambiamos el valor de file por el url que nos ha devuelto en el paso anterior */
      }
   }
};
</script>

<style scoped>
p {
   margin: 1em;
   text-align: start;
}

h1 {
   font-size: 1.1em;
}

textarea {
   resize: none;
   padding: 1em;
   border-radius: 15px;
   border: none;
   background-color: rgba(161, 153, 153, 0.178);
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
   width: 80%;
   margin: auto;
}

.form input {
   width: 70%;
   margin: auto;
   margin-bottom: 1.5em;
   /* border-radius: 15px; */
   border: none;
   border-bottom: 2px solid rgba(161, 153, 153, 0.178);
   padding: 0.5em 1em;
}

.form input:focus {
   outline: none;
   border-bottom: 2px solid var(--colorPrimary);
}
</style>
