<template>
   <div v-if="this.searchEventFilter.length >= 1" class="container-modal">
      <div v-for="event in searchEventFilter" :key="event">
         <ul>
            <div @click="this.openEvent(event)" class="container-li">
               <img :src="event.photo" alt="foto del evento" />
               <li>
                  {{ event.name }}
               </li>
            </div>
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
      console.log(event)
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
   position: absolute;
   width: 295px;
   min-height: min-content;
   max-height: 500px;
   overflow: scroll;
   background-color: #ffffff;
   box-shadow: 0px 0px 5px grey;
   top: 3em;
   left: 3.3em;
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
   height: 50px;
   font-size: 1.2em;
   display: flex;
   justify-content: center;
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
