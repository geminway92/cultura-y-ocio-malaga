<template>
  <div class="container-next-event">
      <div class="container-next-event--header">
        <h1>Próximos Eventos en <span>{{monthLetter}}</span></h1>
        <div class="container-arrow-slider">
          <div @click="moveSliderLeft()" class="container-arrow--left" :class="arrowLeftActive ? 'arrow-purple' : 'arrow-grey'">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div @click="moveSliderRight()" class="container-arrow--right" :class="arrowRightActive ? 'arrow-purple' : 'arrow-grey'">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="container-slider"  ref="slider">
          <div v-for="event in filterMonthEvent" :key="event" class="container-card slide">
            <div class="container-img">
              <img src="../../../assets/images/categoria-sin-nombre.png" alt="">
            </div>
            <div class="container-flex">
              <div class="container-h">
                <h5 class="subtitle-date">{{event.date}}</h5>
                <h2>{{event.name}}</h2>
              </div>
              <div class="container-total-people">
                  <img :src="user.profilePicture" alt="">
                  <div class="container-count-people">
                      <h4>+25</h4>
                  </div>
                  <button @click="getEventInterested()">Ver Evento</button>
              </div>
            </div>
          </div>
        <!-- <div v-if="this.events.length <= 0"  class="container-no-events">
          <h1>No hay eventos</h1>
        </div> -->
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'

export default {
  data(){
    return{
      slider: null,
      width: null,
      resetWidth: null,
      eventsCurrent: '',
      Categoria: null,
      arrowLeftActive: false,
      arrowRightActive: true,
      filterEvents: null,
      totalClickRight: 0,
    }
  },
  
  props:{
    openModalIsTrue:{
      type: Boolean,
      default: false
    },
    filterMonthEvent:{
      type: Array

    },

    monthLetter:{
      type: String
    }
  },

  methods:{

    

    moveSliderRight(){
      
      if(this.totalClickRight < this.filterMonthEvent.length -1){ /*-1 porque al empezar en 0 el length no contabiliza bien */
        this.totalClickRight++
        this.arrowLeftActive = true
        console.log(this.totalClickRight)

        if(this.totalClickRight === this.filterMonthEvent.length -1){
          this.arrowRightActive = false
        }
        this.slider.scrollTo({
          left: this.width * 1,
          behavior: 'smooth'
        })

        this.width = this.width + this.resetWidth
        if(this.width < this.resetWidth){
          return this.width = this.resetWidth
        }

      } else return
      
    },

    moveSliderLeft(){
      if(this.totalClickRight > 0 ){
        this.arrowLeftActive = true
        this.arrowRightActive = true
        this.totalClickRight--
        this.width = this.width - this.resetWidth  /*Resta para moverse a la izquierda */
        

        console.log(this.totalClickRight)
        if(this.totalClickRight <= 1){
          this.arrowLeftActive = false
        }

        this.slider.scrollTo({
          left: this.width - this.resetWidth,
          behavior: 'smooth'
        } )
        if(this.width < this.resetWidth){
          return this.width = this.resetWidth
        } 

      } else return
      
    },

  },

  computed:{
    ...mapState('auth',['user']),
    ...mapState('event',['events'])
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

.arrow-grey{
  border: 2px solid var(--colorSecundary);
  color: var(--colorSecundary);
  cursor: pointer;
}

.arrow-purple{
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
  height: 130px;
}


.container-card h2 {
  width: 200px;
  font-size: .9em;
  text-align: start;
  margin-left: .5em;
}

.container-flex{
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: #ffe60015;
  text-align: start;
  justify-content: space-between;
  
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
  margin-bottom: .5em;
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

.img-categorias{
  height: 120px;
  object-fit: cover;
}
</style>