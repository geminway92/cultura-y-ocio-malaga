<template>
  <div class="bar-botton">
      <div class="container-bar">
        <button>Descubra</button>
        <i class="far fa-calendar-alt"></i>
        <i class="fas fa-bell"></i>
        <i class="fas fa-user"></i>
      </div>
  </div>
</template>

<script>
export default {

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

.container-bar{
    display: flex;
    height: 70px;
    margin: auto;
    justify-content: space-between;
}



</style>