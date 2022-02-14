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
         items: [
            {
               id: "1",
               startDate: "2022-10-09",
               endDate: "2022-10-19",
               title: "Ejemplo evento 1"
            },
            {
               id: "2",
               startDate: "2022-02-19",
               endDate: "2022-02-19",
               title: "Ejemplo evento 2"
            },
            {
               id: "3",
               startDate: "2022-02-19",
               title: "Ejemplo largo"
            }
         ]
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

   }
};
</script>

<style></style>
