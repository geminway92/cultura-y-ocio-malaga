<template>
  <div class="container-popular-event">
      <h1 class="title">Eventos Populares</h1>
      <div v-if="filterPopularEvent.length === 1" class="container-card">
          <div class="container-img">
            <img :src="filterPopularEvent[0].photo" alt="">
          </div>
          <div class="container-content">
                <h4>{{filterPopularEvent[0].date}}</h4>
                <h2>{{filterPopularEvent[0].name}}</h2>
                <p>{{filterPopularEvent[0].description.substring(0,27) + '...'}}</p>
                <div class="container-total-people">
                    <div class="container-count-people">
                        <h4>+{{filterPopularEvent[0].joined}}</h4>
                        <h4>Inscritos</h4>
                    </div>
                    <div class="container-buttons">
                        <button class="button-show">Ver</button>
                        <button class="button-join">Unir</button>
                    </div>
                </div>
                </div>
          </div>
            <div v-if="this.filterPopularEvent.length === 0 " class="container-no-events">
            <h1>No hay eventos</h1>
      </div> 
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    props:{
        filterPopularEvent:{
            type: Array
        }
    },

    computed:{
    ...mapState('auth',['user'])
  }
}
</script>

<style scoped>


.container-popular-event{
    height: min-content;
}

.title{
    font-size: 1.5em;
    text-align: start;
    width: 200px;
    margin: 1em 1em 0;
}
.container-card{
    background-color: #ffe60015;
    height: min-content;
    margin: 1em;
    display: flex;
}

.container-img{
    width: 250px;
}

.container-img img{
    width: 100%;
    border-radius: 15px;
}

.container-content{
    width: 100%;
    height: 100%;
    text-align: start;
    background-color: violet;
}

.container-content h4{
    color: var(--colorSecundary);
    margin-left: .3em;
}

.container-content h2{
    font-size: 1em;
    position: relative;
    bottom: .5em;
    width: 150px;
    margin-left: .3em;
}

.container-content p{
    position: relative;
    bottom: 1.2em;
    font-size: .9em;
    margin-left: .3em;
}

.container-total-people{
    display: flex;
    width: min-content;
    background-color: violet;
    justify-content: space-between;
}

.container-total-people img{
    width: 30px;
    height: 30px;
    border-radius: 100%;
}


.container-count-people{
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  border: 2px solid var(--colorPrimary);
  position: relative;
  gap: 1.1em;
  background-color: #ffffff;
  margin-left: .3em;
  
}

.container-count-people h4{
  font-size: .8em;
  margin: auto;
  left: .4em;
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
  padding: .5em;
  cursor: pointer;
}


.button-join{ 
  background-color: var(--colorPrimary);
}

.button-show{
  background-color: var(--colorSecundary);
}

.container-buttons{
    background-color: blue;
    display: flex;
    gap: 1em;
    margin-left: 1em;
}

.container-no-events{
  font-size: 1em;
  margin: 1em;
  width: 90%;
  height: min-content;
  background-color: #ffe60015;
  justify-content: center;
}

.container-no-events h1{
    padding: .7em;
}
</style>