<template>
   <div class="container-next-event">
      <div class="container-next-event--header">
         <h1>
            Próximos Eventos en <span>{{ monthLetter }}</span>
         </h1>
         <div class="container-arrow-slider">
            <div
               @click="moveSliderLeft()"
               class="container-arrow--left"
               :class="arrowLeftActive ? 'arrow-purple' : 'arrow-grey'"
            >
               <i class="fas fa-arrow-left"></i>
            </div>
            <div
               @click="moveSliderRight()"
               class="container-arrow--right"
               :class="arrowRightActive ? 'arrow-purple' : 'arrow-grey'"
            >
               <i class="fas fa-arrow-right"></i>
            </div>
         </div>
      </div>
      <div class="container-slider" ref="slider">
         <div
            v-for="event in updateEvent"
            :key="event"
            class="container-card slide"
         >
            <div class="container-img">
               <img v-if="event.photo" :src="event.photo" alt="" />
               <img
                  v-else
                  src="../../../assets/images/categoria-sin-nombre.jpg"
                  alt=""
               />
            </div>
            <div class="container-flex">
               <div class="container-h">
                  <h5 class="subtitle-date">{{ event.date }}</h5>
                  <h2>{{ event.name }}</h2>
                  <p>{{ event.description.substring(0, 30) + '...' }}</p>
               </div>
               <div class="container-total-people">
                  <div
                     @click="this.$emit('openModalName', event.register)"
                     v-if="event.joined > 0"
                     class="container-count-people"
                  >
                     <h4>+{{ event.joined }}</h4>
                     <h4>Inscritos</h4>
                  </div>
                  <div class="container-buttons">
                     <button
                        class="button-show"
                        @click="getEventInterested(event)"
                     >
                        Ver
                     </button>
                     <button class="button-join" @click="checkUser(event)">
                        Unir
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div v-if="this.updateEvent.length === 0" class="container-no-events">
            <h1>No hay eventos</h1>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
   data() {
      return {
         slider: null,
         width: null,
         resetWidth: null,
         eventsCurrent: '',
         Categoria: null,
         arrowLeftActive: false,
         arrowRightActive: true,
         filterEvents: null,
         totalClickRight: 0
      };
   },

   props: {
      openModalIsTrue: {
         type: Boolean,
         default: false
      },
      filterMonthEvent: {
         type: Array
      },

      monthLetter: {
         type: String
      },
   },

   methods: {
      ...mapActions('event', ['joinEventAction', 'loadEventAction','loadEventAnonimous']),

      moveSliderRight() {
         if (this.totalClickRight < this.updateEvent.length) {
            /*-1 porque al empezar en 0 el length no contabiliza bien */
            this.totalClickRight++;
            this.arrowLeftActive = true;

            if (this.totalClickRight === this.updateEvent.length) {
               this.arrowRightActive = false;
            }

            this.slider.scrollTo({
               left: this.width * 1,
               behavior: 'smooth'
            });

            this.width = this.width + this.resetWidth;
            if (this.width < this.resetWidth) {
               return (this.width = this.resetWidth);
            }
         } else return;
      },

      moveSliderLeft() {
         if (this.totalClickRight > 0) {
            this.arrowLeftActive = true;
            this.arrowRightActive = true;
            this.totalClickRight--;
            this.width =
               this.width -
               this.resetWidth; /*Resta para moverse a la izquierda */

            if (this.totalClickRight <= 1) {
               this.arrowLeftActive = false;
            }

            this.slider.scrollTo({
               left: this.width - this.resetWidth,
               behavior: 'smooth'
            });
            if (this.width < this.resetWidth) {
               return (this.width = this.resetWidth);
            }

            if (screen.width < 700 && this.totalClickRight <= 1) {
               this.arrowRightActive = false;
            } else if (
               screen.width > 700 &&
               screen.width < 1200 &&
               this.totalClickRight <= 2
            ) {
               //* Al añadirle totalclickRight 1 en mounted necesita hacer esta correción para que se desactive el boton */
               this.arrowLeftActive = false;
            } else if (screen.width > 1200 && this.totalClickRight <= 4) {
               this.arrowLeftActive = false;
            }
         }
         return;
      },

      checkTotalEvent() {
         this.updateEvent.length <= this.totalClickRight
            ? (this.arrowRightActive = false)
            : (this.arrowRightActive = true);
      },

      getEventInterested(event) {
         this.$emit('openModal', event);
      },

      async joinEvent(event) {
         const dataToSave = {
            id: event.id,
            name: event.name,
            schedule: event.schedule,
            date: event.date,
            description: event.description,
            photo: event.photo,
            joined: event.joined,
            register: event.register
         };

         const eventUser = {id: this.user.email ,startDate: dataToSave.date,endDate: dataToSave.date,title: dataToSave.name,classes: "purple",}
         const filter = event.register.filter(e => e === this.user.name);

         if (filter.length > 0) {
            return;
         }
         dataToSave.joined = event.joined + 1;
         event.register.push(this.user.name);

         await this.joinEventAction({dataToSave, eventUser});
         await this.loadEventAction();

         return (event.joined = event.joined + 1);
      },
      checkUser(event){
         if(this.myEvents || this.users === undefined){
            console.log('soy undefined')
             const eventUser = {id: 'anonimo' ,startDate: event.date,endDate: event.date,title: event.name,classes: "purple"}

            this.loadEventAnonimous( eventUser)
            return
         }else {
            this.joinEvent();
         }
      },

      checkScreen() {
         this.slider = this.$refs.slider;
         this.width = this.slider.offsetWidth;
         this.resetWidth = this.width;

         if (screen.width < 700) {
            this.totalClickRight = 1;
         } else if (screen.width > 700 && screen.width < 1100) {
            this.width = this.width / 2;
            this.resetWidth = this.width;

            this.totalClickRight = 2;
         } else if (screen.width > 1200) {
            this.width = this.width / 4;
            this.resetWidth = this.width;

            this.totalClickRight = 4;
         }
      }
   },

   computed: {
      ...mapState('auth', ['user']),
      ...mapState('event', ['events']),

      updateEvent() {
         if (this.filterMonthEvent.length <= 1) this.arrowRightActive = false;
         /*Comprobar longitud para bloquear o activar botón */ else
            this.arrowRightActive = true;

         return this.filterMonthEvent; /*Para que actualice el filtro de eventos por mes si se registra uno */
      }
   },

   mounted() {
      this.checkScreen();
      this.checkTotalEvent();
   },

   beforeUpdate() {
      this.checkTotalEvent();
   }
};
</script>

<style scoped>
p {
   margin: 0.3em;
   width: 280px;
}

@media screen and (width: 320px) {
   p {
      width: 150px;
   }
}

@media screen and (min-width: 360px) {
   p {
      width: 90%;
   }
}

.container-next-event--header {
   display: flex;
   justify-content: space-between;
   margin: 0.5em 0.2em 0em 0.1em;
}

@media screen and (min-width: 730px) {
   .container-next-event {
      top: -3em;
      position: relative;
   }
}

@media screen and (min-width: 1200px) {
   .container-next-event--header {
      position: relative;
      top: 3em;
   }
}

.container-next-event--header h1 {
   width: 200px;
   font-weight: 600;
   font-size: 1.5em;
   text-align: start;
   margin-left: 0.5em;
}

.container-arrow-slider {
   display: flex;
   gap: 1em;
   margin: 0.5em 1em;
}

.container-arrow--left,
.container-arrow--right {
   background-color: #f3f3f4;
   width: 40px;
   height: 40px;
   border-radius: 100%;
   display: flex;
   justify-content: center;
   flex-direction: column;
}

.arrow-grey {
   border: 2px solid var(--colorSecundary);
   color: var(--colorSecundary);
   cursor: pointer;
}

.arrow-purple {
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

@media screen and (min-width: 730px) {
   .container-slider {
      top: 2em;
      width: 700px;
      position: relative;
   }
}

@media screen and (min-width: 1200px) {
   .container-slider {
      top: 2em;
      width: 1400px;
      height: 200px;
      position: relative;
   }
}

.container-card {
   display: flex;
   width: 250px;
}

@media screen and (min-width: 730px) {
   .container-card {
      margin: 1em;
   }
}

img {
   width: 110px;
   height: 100%;
   border-radius: 15px;
   object-fit: cover;
}

.container-card h2 {
   width: 200px;
   font-size: 0.9em;
   text-align: start;
   margin-left: 0.5em;
}

.container-flex {
   display: flex;
   flex-direction: column;
   width: 400px;
   background-color: #ffe60015;
   text-align: start;
}

@media screen and (min-width: 730px) {
   .container-flex {
      width: min-content;
   }
}

.subtitle-date {
   margin: 0;
   font-size: 0.9em;
   color: var(--colorSecundary);
   margin: 0.2em 0.6em;
}

.slide {
   width: 100%;
   background-color: #fefbf5;
   border-radius: 15px;
}

.container-total-people {
   display: flex;
   flex-direction: column;
   width: 80%;
}

.container-count-people {
   display: flex;
   width: 25px;
   height: 25px;
   border-radius: 100%;
   border: 2px solid var(--colorPrimary);
   gap: 1.5em;
   margin-left: 0.3em;
   background-color: #ffffff;
}

.container-count-people h4 {
   font-size: 0.8em;
   margin: auto;
   left: 0.4em;
   position: relative;
   width: min-content;
   cursor: pointer;
}

.container-total-people button {
   border-radius: 15px;
   width: 50px;
   border: none;
   color: #ffffffea;
   font-weight: lighter;
   padding: 0.5em;
   cursor: pointer;
}

.container-buttons {
   display: flex;
   justify-content: center;
   margin: auto;
   margin-bottom: 0.3em;
   gap: 1em;
}

.container-button--anonimous {
   margin: auto;
   margin-bottom: 0.3em;
   width: min-content;
}

.button-join {
   background-color: var(--colorPrimary);
}

.button-show {
   background-color: var(--colorSecundary);
}

.container-no-events {
   font-size: 1em;
   margin: 0;
   margin-left: 0.5em;
   text-align: center;
   width: 100%;
   background-color: #ffe60015;
}
</style>
