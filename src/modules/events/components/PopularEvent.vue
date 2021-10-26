<template>
  <div class="container-popular-event">
      <h1 class="title">Eventos Populares</h1>
      <div class="container-card">
          <div class="container-img">
            <img src="../../../assets/images/4.jpg" alt="">
          </div>
          <div class="container-content">
            <h4>Oc 12.2021</h4>
            <h2>Car Freak Meetup</h2>
            <p>El mayor evento en Dhaka, únete para ver la emoción del nuevo tipo de coche</p>
            <div class="container-total-people">
                <img :src="user.profilePicture" alt="">
                <div class="container-count-people">
                    <h4>+25</h4>
                </div>
                <button class="button-join">Unir</button>
                <button class="button-look">Ver</button>
            </div>
          </div>
      </div>
      
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
        return{

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
    width: 270px;
}

.container-img img{
    width: 100%;
    border-radius: 15px;
}

.container-content{
    width: 100%;
    height: 95px;
    text-align: start;
}

.container-content h4{
    margin: .5em .5em;
    color: var(--colorSecundary);
}

.container-content h2{
    font-size: 1.2em;
    position: relative;
    bottom: .5em;
    width: 150px;
    margin-left: .5em;
}

.container-content p{
    margin: 0;
    position: relative;
    bottom: 1.2em;
    font-size: .9em;
    margin: .5em;
}

.container-total-people{
    display: flex;
    width: min-content;
    position: relative;
    bottom: 1.3em;
}

.container-total-people img{
    width: 30px;
    height: 30px;
    border-radius: 100%;
}


.container-count-people{
    width: 25px;
    height: 25px;
    border-radius: 100%;
    border: 2px solid var(--colorPrimary);
    position: relative;
    right: .9em;
    background-color: #ffffff;
}

.container-count-people h4{
    font-size: .8em;
    margin: .4em auto;
    width: min-content;
}

.container-total-people button {
    width: 50px;
    border-radius: 15px;
    border: none;
    color: #ffffffea;
    font-weight: lighter;
    margin: auto;
    padding: .5em;
}

.button-join{ 
    margin-left: .5em;
    background-color: var(--colorPrimary);
}

.button-look{
    background: var(--colorSecundary);
    position: relative;
    left: 1em;
}
</style>