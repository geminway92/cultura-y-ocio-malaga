<template>
   <div id="calendar">
      <div class="container-title">
         <span
               @click="this.$router.push({name: 'eventlayout'})"
               class="fas fa-chevron-left icon-back"
            ></span>
         <h1>Mi Calendario</h1>
      </div>
      <calendar-view
         :show-date="showDate"
         :items="items"
         :starting-day-of-week="startingDayOfWeek"
         display-period-uom="month"
         class="theme-default holiday-us-traditional holiday-us-official"
         @click-date="onClickDate"
      >
         <template #header="{ headerProps }">
            <calendar-view-header
               :header-props="headerProps"
               @input="setShowDate"
            />
         </template>
      </calendar-view>
   </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
import { mapState } from 'vuex';
import '../../../../node_modules/vue-simple-calendar/dist/style.css';
import "../../../../node_modules/vue-simple-calendar/static/css/default.css"
import "../../../../node_modules/vue-simple-calendar/static/css/holidays-us.css"

export default {
   name: 'calendar',
   components: {
      CalendarView,
      CalendarViewHeader
   },
   data(){
      return{
         showDate: new Date(),
         items: [],
         startingDayOfWeek: 1,
         eventRegisterData: this.checkEventRegister
      }
   },
   methods: {

      setShowDate(d){
         this.showDate = d;
      },
      onClickDate(...params){
         console.log(params)
      },
      thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		},
      printEvent(){
         if(this.user.email === undefined ){
            if(this.items.length === 0){

               this.items =  this.eventRegister
               return this.items
            }
         }else {
            if(this.eventRegister.length > 0){
               console.log(this.eventRegister)

               let valueEvent = Object.values(this.eventRegister)
            valueEvent.forEach(e => {
               this.items.push(e)
            })
               }
         }
      },
      fetchApi(){

         if(this.user === null ){
         this.$router.push({name: 'login'})

            return
         }
         console.log(this.eventRegister[0])
         return this.printEvent(this.eventRegister[0]);
      }


   },
   computed:{
      ...mapState('auth',[ 'user']),
      ...mapState('event',[ 'eventRegister']),

      checkEventRegister(){
         this.printEvent(this.eventRegister[0])
         console.log(computada)
         return this.eventRegister[0]
      }
   },

   mounted(){
      this.fetchApi();
      console.log('mounted')
   }
};
</script>

<style>
#calendar{
   font-family: 'Montserrat', sans-serif;
}
.container-title {
   background:#B128C3;
   display: flex;
   justify-content:center ;
   align-items:center;
   position: relative;
}

.container-title span {
   position: absolute;
   left: 1em;
   font-size: 25px;
   color: white;
   cursor:pointer;
}
.container-title h1 {
   color:white;
   font-weight: bold;
   font-size: 1.5em;
}

.cv-header{
   background: #f0f0f0;
}
.cv-header-days{
   background: #f0f0f0;
}
.previousYear:hover,
.previousPeriod:hover,
.nextPeriod:hover,
.nextYear:hover{
   background: #bb8dff;
}
.today{
   background: #bb8dff52;
}
.cv-week{
	min-height: 6rem;
}
</style>

