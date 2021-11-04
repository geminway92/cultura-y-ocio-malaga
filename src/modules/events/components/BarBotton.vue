<template>
  <div class="bar-botton">
      <div class="container-bar">
        <button @click="this.$emit('openModalCreateEvent')">Crear evento</button>
        <i class="far fa-calendar-alt"></i>
        <i class="fas fa-bell"></i>
        <i class="fas fa-user"></i>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    showCreateModal:{
      type: Boolean,
      default: false
    }
  }

}
</script>

<style scoped>
button {
  background-color: var(--colorPrimary);
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 1em;
  padding: 1em;
  margin: auto ;
  text-align: center;
}

i{
  margin: auto;
  font-size: 1.3em;
}

@media screen and (min-width: 1800px) {

  button{
    padding: 2em;
  }

  i{
    font-size: 2em;
  }
}

.container-bar{
  display: flex;
  height: 70px;
  justify-content: space-between;
  z-index: 1;
  cursor: pointer;
}

@media screen and (min-width: 1800px) {
  .container-bar{
    height: 100px;
  }
}


</style>