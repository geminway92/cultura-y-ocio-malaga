import { mapActions } from 'vuex';
<template>
  <div class="container-next-event">
      <div class="container-next-event--header">
      <h1>Próximos Eventos en <span>{{currentMonth}}</span></h1>
      <div class="container-arrow-slider">
        <div class="container-arrow--left">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="container-arrow--right">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
      </div>
      <div class="container-slider">
        <div class="container-img">
            <img class="slide" src="../../../assets/images/1.jpg" alt="">
            <h5 class="subtitle-date">Oct 15,2021</h5>
            <h2>Tour of the Alps</h2>
            <div class="container-total-people">
                <img :src="user.profilePicture" alt="">
                <div class="container-count-people">
                    <h4>+25</h4>
                </div>
                <button>Ver Evento</button>
            </div>
        </div>
        <div class="container-img">
            <img class="slide" src="../../../assets/images/2.jpg" alt="">
            <h5 class="subtitle-date">Oct 15,2021</h5>
            <h2>Food Festival</h2>
            <div class="container-total-people">
                <img :src="user.profilePicture" alt="">
                <div class="container-count-people">
                    <h4>+30</h4>
                </div>
                <button>Ver Evento</button>
            </div>
        </div>
        <div class="container-img">
            <img class="slide" src="../../../assets/images/3.jpg" alt="">
            <h5 class="subtitle-date">Oct 15,2021</h5>
            <h2>Food Festival</h2>
            <div class="container-total-people">
                <img :src="user.profilePicture" alt="">
                <div class="container-count-people">
                    <h4>+25</h4>
                </div>
                <button>Ver Evento</button>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import getDayMonthYear from "../helpers/getMonthYear";

export default {
  data(){
    return{
      currentMonth: null,
    }
  },

  methods:{
    ...mapActions('event',['getEvents']),

    CurrentEvents(){
      this.getEvents()
    },

    month(){
      const {month} = getDayMonthYear(this.currentMonth)
      this.currentMonth = month
    },
    
    getCurrentMonth(monthNumber){
      const resp = monthNumber.filter( e => e === this.month.length )
      console.log('obteniendo mes letra', resp)
    }

    

    

  },

  computed:{
  ...mapState('auth',['user'])
  },

  created(){
    this.CurrentEvents()
    this.month()
  }

}
</script>

<style scoped>
.container-next-event--header{
  display: flex;
  justify-content: space-between;
  margin: .5em .2em 0em .1em;
}

.container-next-event--header h1{
  width: 200px;
  font-weight: 600;
  font-size: 1.5em;
  text-align: start;
  margin-left: .5em;
}

.container-arrow-slider{
  display: flex;
  gap: 1em;
  margin: .5em 1em;
}

.container-arrow--left,
.container-arrow--right {
  background-color: #F3F3F4;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container-arrow--left{
  border: 2px solid var(--colorSecundary);
  color: var(--colorSecundary);
}

.container-arrow--right{
  color: var(--colorPrimary);
  border: 2px solid var(--colorPrimary);
}

.container-slider {
  width: 90%;
  display: grid;
  grid-template-columns: repeat( 3, 1fr);
  overflow: hidden;
  gap: 1em;
  margin: .3em 1.6em ;
}

.container-img{
  display: flex;
  flex-direction: column;
  gap: .2em;
  background-color: #ffe60015;
  border-radius: 15px;
  text-align: start;
}

.container-img h2 {
  font-size: 1.2em;
  margin: 0;
  margin-left: .5em;
}

.subtitle-date{
    margin: 0;
    font-size: .9em;
    color: var(--colorSecundary);
    margin: .2em .6em ;
}

.slide {
  width: 150px;
  background-color: #FEFBF5;
  border-radius: 15px;
}

.container-total-people{
    display: flex;
    width: min-content;
    margin-top: .8em;
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
    width: 90px;
    border-radius: 15px;
    border: none;
    background-color: var(--colorPrimary);
    color: #ffffffea;
    font-weight: lighter;
    margin: auto;
    padding: .5em;
}
</style>