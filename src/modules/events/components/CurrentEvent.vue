<template>
  <div class="container-next-event">
      <div class="container-next-event--header">
        <h1>Próximos Eventos en <span>{{currentMonth}}</span></h1>
        <div class="container-arrow-slider">
          <div @click="moveSliderLeft()" class="container-arrow--left">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div @click="moveSliderRight(n)" class="container-arrow--right">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="container-slider"  ref="slider">
          <div v-for="item in eventsCurrent" :key="item"  class="container-card slide">
            <div class="container-img">
              <img src="../../../assets/images/1.jpg" alt="">
            </div>
            <div class="container-flex">
              <h5 class="subtitle-date">{{item.F_INICIO}}</h5>
              <h2>{{item.NOMBRE}}</h2>
              <div class="container-total-people">
                  <img :src="user.profilePicture" alt="">
                  <div class="container-count-people">
                      <h4>+25</h4>
                  </div>
                  <button>Ver Evento</button>
              </div>
            </div>
          </div>
        <div v-if="eventsCurrent.length <= 0"  class="container-no-events">
          <h1>No hay eventos</h1>
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
      slider: null,
      width: null,
      resetWidth: null,
      currentMonth: null,
      eventsCurrent: ''
    }
  },

  methods:{
    ...mapActions('event',['getEvents']),

    async getEventInApi(){
      const resp = await this.getEvents()
      this.getCurrentMonth(resp)
    },

    month(){
      const {month} = getDayMonthYear(this.currentMonth)
      this.currentMonth = month
    },
    
     getCurrentMonth(events){
      let {monthNumber, year} = getDayMonthYear() /*Extrae el año y número de mes actual */
      if(monthNumber < 10 ){
        monthNumber = `05`   /*`0${month}`  colocar eso cuando acabe las pruebas*/
      }

      const date = `${year}-${monthNumber}`  /*Crea una constante para mandarla al filter en el formato adecuado  */
      const filterEvents = events.filter(e => e.F_INICIO.includes(date))  /*Filtra todos los eventos del mes actual */

      this.eventsCurrent = filterEvents  
      console.log(date)
      console.log('es la respuesta', filterEvents)
    },

    moveSliderRight(){

      this.slider.scrollTo({
        left: this.width * 1,
        behavior: 'smooth'
      } )

      this.width = this.width + this.resetWidth
      console.log(this.width)
      if(this.width < this.resetWidth){
        return this.width = this.resetWidth
      } 
    },

    moveSliderLeft(){
      this.slider.scrollTo({
        left: -this.width * 1,
        behavior: 'smooth'
      } )
      this.width = this.width - this.width
      console.log(this.width)
      if(this.width < this.resetWidth){
        return this.width = this.resetWidth
      } 
    }



  },

  computed:{
    ...mapState('auth',['user']),
  },


  created(){
    this.getEventInApi()
    this.month()
  },
  
  mounted(){
    this.slider = this.$refs.slider
    this.width = this.slider.offsetWidth
    this.resetWidth = this.slider.offsetWidth
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
  cursor: pointer;
}

.container-arrow--right{
  color: var(--colorPrimary);
  border: 2px solid var(--colorPrimary);
  cursor: pointer;
}

.container-slider {
  width: 90%;
  display: flex;
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
  margin: auto;
}

.container-card {
  display: flex;
  width: 250px;
  height: min-content;
  gap: .2em;
}

.container-img{
  width: min-content;
  background-color: #ffe60015;
  margin: auto;
}

.container-img img {
  border-radius: 15px;
  width: 110px;
}


.container-card h2 {
  font-size: 1em;
  margin: 0;
  margin-left: .5em;
  text-align: start;
}

.container-flex{
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: #ffe60015;
  text-align: start;
}

.subtitle-date{
  margin: 0;
  font-size: .9em;
  color: var(--colorSecundary);
  margin: .2em .6em ;
}

.slide {
  width: 100%;
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

.container-no-events{
  font-size: 1em;
  margin: 0;
  margin-left: .5em;
  text-align: center;
  width: 100%;
  width: 400px;
  background-color: #ffe60015;
}
</style>