<template>
   <div class="container-modal">
      <div v-for="event in searchEventFilter" :key="event">
         <ul>
            <li class="container-li"  @click="this.openEvent(event)" data-testid="li-title">
               <img :src="event.photo" alt="foto del evento" />
               <h1>{{ event.name }}</h1>
            </li>

         </ul>
      </div>
   </div>
</template>

<script>
export default {
  props: {
    openModalSearch: {
      type: Boolean,
      default: false
    },

    searchEventFilter: {
      type: Array
    }
  },

  methods: {
    openEvent (event) {
      this.$router.push({
        name: 'event-id',
        params: { id: event.id }
      })
    }
  }
}
</script>

<style scoped>
.container-modal {
   width: 100%;
   min-width: 300px;
   min-height: min-content;
   max-height: 500px;
   overflow: scroll;
   overflow: hidden;
   background-color: #ffffff;
   box-shadow: 0px 0px 5px grey;
   z-index: 6;
}

ul {
   margin: 0;
   list-style-type: none;
}

.container-li {
   display: flex;
   margin-top: 0.3em;
   position: relative;
}

.container-li:hover {
   background-color: #a4a3a13a;
   width: 100%;
   cursor: pointer;
}

li {
   display: flex;
   align-items: center;
}

img {
   width: 30px;
   height: 40px;
   object-fit: cover;
   position: relative;
   right: 2em;
   border-radius: 5px;
}

</style>
