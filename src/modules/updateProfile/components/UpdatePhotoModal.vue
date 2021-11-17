<template>
   <div
      v-if="openModalPhoto"
      @click.self="this.$emit('changePhoto')"
      class="container-modal"
   >
      <div class="modal">
         <form @submit.prevent="this.updatePhoto()">
            <h1>Actualizar foto</h1>
            <input class="input-photo" type="file" @change="onSelectImage" />
            <input class="button-submit" type="submit" value="Cambiar" />
         </form>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Swal from 'sweetalert2';
import getUpdatePhoto from '../helper/getUpdatePhoto';

export default {
   data() {
      return {
         picture: ''
      };
   },

   props: {
      openModalPhoto: {
         type: Boolean,
         default: false
      }
   },

   methods: {
      ...mapActions('updateStore', ['updateUserAction']),

      async onSelectImage(event) {
         const file = event.target.files[0];
         const resp = await getUpdatePhoto(file);

         this.picture = resp;
      },

      async updatePhoto() {
         const updateUser = this.user;

         updateUser.idToken = this.idToken;
         updateUser.profilePicture = this.picture;

         const resp = await this.updateUserAction(updateUser);
         if (!resp.ok)
            Swal.fire({
               icon: 'error',
               title: resp.message,
               confirmButtonColor: '#B128C3'
            });
         else
            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Cambio exitoso',
               showConfirmButton: false,
               timer: 1500
            });

         this.$emit('changePhoto');
      }
   },

   computed: {
      ...mapState('auth', ['user', 'idToken'])
   }
};
</script>

<style scoped>
form {
   width: 80%;
   display: flex;
   flex-direction: column;
   gap: 0.5em;
}

h1 {
   margin-bottom: 0;
}

h4 {
   margin: 0;
   color: #b128c3;
}

.container-modal {
   background-color: rgba(116, 111, 111, 0.295);
   position: absolute;
   width: 100vw;
   height: 100vh;
   z-index: 5;
   display: flex;
   justify-content: center;
   align-items: center;
}

.modal {
   display: flex;
   justify-content: center;
   width: 300px;
   height: 150px;
   background-color: #ffffff;
   border-radius: 15px;
   box-shadow: 2px 3px 5px grey;
}

.title-name {
   margin: 0em 0.8em 0.3em;
   text-align: start;
   font-size: 1em;
}

.input-photo {
   width: 90%;
   height: 30px;
   border: none;
   margin: auto;
}

.button-submit {
   background-color: #b128c3;
   width: 80px;
   border: none;
   border-radius: 15px;
   padding: 0.7em;
   color: white;
   margin: auto;
   cursor: pointer;
}
</style>
