<template>
   <div id="nav">
      <h1 v-if="currentState === 'authenticating'">{{ currentState }}</h1>
      <router-view v-else />
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
   data() {
      return {};
   },

   methods: {
      ...mapActions('auth', ['checkAuth']),

      async checkStatus() {
         const resp = await this.checkAuth();
         return resp;
      }
   },

   computed: {
      ...mapGetters('auth', ['currentState'])
   }
};
</script>

<style>
#app {
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
}
</style>
