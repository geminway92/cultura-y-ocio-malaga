<template>
   <div id="app">
    <vue-cal style="height: 250px" locale="es" />
   </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/i18n/es.js'
import 'vue-cal/dist/vuecal.css';




export default {

    components: { VueCal },
    data: () => ({

    }),
}
</script>

<style  scoped>
h1{
  color: black
}
</style>

