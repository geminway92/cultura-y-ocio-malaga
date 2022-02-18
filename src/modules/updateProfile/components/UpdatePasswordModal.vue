<template>
   <div
      v-if="openModalNewPassword"
      @click.self="this.$emit('changePassword')"
      class="container-modal"
   >
      <div class="modal">
         <form @submit.prevent="this.updatePassword()">
            <h1>Actualizar contraseña</h1>
            <label>
               <h3 class="title-name">Contraseña</h3>
               <input
                  class="input-password"
                  type="password"
                  v-model="newPassword"
                  minlength="6"
                  required
               />
            </label>
            <input class="button-submit" type="submit" />
         </form>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      newPassword: ''
    }
  },

  props: {
    openModalNewPassword: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    ...mapActions('updateStore', [
      'changeNameAction',
      'changePasswordAction'
    ]),

    async updatePassword () {
      const updateUser = this.user
      updateUser.password = this.newPassword
      updateUser.idToken = this.idToken
      console.log(updateUser)

      //* Make http request for change name
      const resp = await this.changePasswordAction(updateUser)

      if (!resp.ok) {
        Swal.fire({
          icon: 'error',
          title: resp.message,
          confirmButtonColor: '#B128C3'
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cambio exitoso',
          showConfirmButton: false,
          timer: 1500
        })
      }

      this.$emit('changePassword')
    }
  },

  computed: {
    ...mapState('auth', ['user', 'idToken'])
  }
}
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
   height: 170px;
   background-color: #ffffff;
   border-radius: 15px;
   box-shadow: 2px 3px 5px grey;
}

.title-name {
   margin: 0.7em 0.8em 0.3em;
   text-align: start;
   font-size: 1em;
}

.input-password {
   width: 90%;
   border-radius: 15px;
   background-color: #f3f3f4;
   padding: 0.5em;
   border: none;
}

.input-password:focus {
   outline: none;
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
