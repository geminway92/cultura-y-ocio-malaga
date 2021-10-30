<template>
    <div @click.self="this.$emit('openModalCreateEvent')" class="container-modal">
        <div class="modal">
            <h1>Nombre</h1>
            <form class="form" @submit.prevent="onSubmit(this.newEvent)">
                <input 
                    type="text" 
                    placeholder="Feria de málaga"
                    v-model="this.newEvent.name">
                
                <h1>Horario</h1>
                <input 
                    type="text" 
                    placeholder="Todo el día"
                    v-model="this.newEvent.schedule">
                
                <h1>Fecha</h1>
                <input 
                    type="date" 
                    min="2021"
                    v-model="this.newEvent.date">
                
                <h1>Descripción</h1>
                <textarea 
                    cols="30" 
                    rows="10" 
                    placeholder="Describe el evento..."
                    v-model="this.newEvent.description">
                </textarea>
                <button type="submit">Crear</button>
            </form>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            newEvent: 
            {
                name: '',
                schedule: '',
                date: '',
                description: '', 
            }
        }
    },

    props:{
    showCreateModal:{
      type: Boolean,
      default: false
    }
  },

  methods:{
    onSubmit(){
        this.$emit('createNewEvent',this.newEvent) /*Envia los datos del form a otro método  que dispara la acción */
        this.$emit('openModalCreateEvent')   /*Cierra modal */
        
        /*Resetea formulario */
        this.newEvent = 
            {
                name: '',
                schedule: '',
                date: '',
                description: '', 
            }
    }
  }
  
  

}
</script>

<style scoped>

p{
    margin: 1em;
    text-align: start;
}

h1{
    font-size: 1.1em;
}

textarea{
    resize: none;
    padding: 1em;
    border-radius: 15px;
    border: none;
    background-color: rgba(161, 153, 153, 0.178);
}

button{
    background-color: var(--colorPrimary);
    border: none;
    border-radius: 15px;
    padding: 1em;
    width: 60px;
    margin: 1em auto;
    color: #ffffff;
}

.container-modal{
    background-color: rgba(116, 111, 111, 0.295);
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 3;
    display: flex;
}

.modal{
    background-color: #ffffff;
    width: 90%;
    height: min-content;
    margin: auto;
    border-radius: 15px;
    box-shadow: 4px 3px 4px #746f6f4b;
    /* overflow: scroll;
    overflow-x: hidden; */
}

.modal::-webkit-scrollbar{
    width: 10px;
}

.modal::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #ada9a9;
    width: 10px;
    height: 20px;
}

.form{
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
}

.form input{
    width: 70%;
    margin: auto;
    border-radius: 15px;
    border: none;
    background-color: rgba(161, 153, 153, 0.178);
    padding: .5em 1em;
}

</style>