<template>
   <div id="app">
      <h1>My Calendar</h1>
      <calendar-view
         :show-date="showDate"
         class="theme-default holiday-us-traditional holiday-us-official"
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
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
import '../../../../node_modules/vue-simple-calendar/dist/style.css';

export default {
   name: 'calendar',
   components: {
      CalendarView,
      CalendarViewHeader
   }
};
</script>

<style></style>
