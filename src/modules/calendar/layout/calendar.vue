<template>
   <div id="app">
      <h1>Mi Calendario</h1>
      <calendar-view
         :show-date="showDate"
         :items="items"
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
      <router-link class="link" :to="{name: 'eventlayout'}">Volver</router-link>
   </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
import { mapState } from 'vuex';
import '../../../../node_modules/vue-simple-calendar/dist/style.css';
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
         items: []
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
         console.log(this.eventRegister[0])
         let valueEvent = Object.values(this.eventRegister[0])

         valueEvent.forEach(e => {
            this.items.push(e)
         })
      },
      fetchApi(){
         if(this.user === null ){
         this.$router.push({name: 'login'})

            return
         }
         return this.printEvent();
      }

   },
   computed:{
      ...mapState('auth',[ 'user']),
      ...mapState('event',[ 'eventRegister'])
   },
   created(){

      this.fetchApi();
   }
};
</script>

<style  scoped>
h1{
  color: black
}
</style>

