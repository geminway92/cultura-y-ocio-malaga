<template>
   <div class="container-layout">
      <div class="container-intro">
         <div class="logo-malaga-event">
            <h1><span>Málaga</span> Event</h1>
         </div>
         <h1>{{ titleIntro }}<span class="contrast">Málaga</span> Event</h1>
         <h2>{{ textIntro }}</h2>
      </div>
   </div>
   <router-view
      @changeTextIntro="changeTextIntro"
      @changeTitleIntro="changeTitleIntro"
   />
</template>

<script>
export default {
  name: 'authlayout',
  data () {
    return {
      textIntro: '',
      titleIntro: ''
    }
  },

  methods: {
    changeTextIntro (text) {
      this.textIntro = text
    },

    changeTitleIntro (title) {
      this.titleIntro = title
    }
  }
}
</script>

<style scoped>
span{
   color: #d278dd;
}

h2 {
   font-size: 18px;
   font-weight: 500;
   width: 80%;
   color: #4D4E56;

}
.contrast{
   color: #A34DAE;
}


.container-intro{
   display: flex;
   flex-direction: column;
   align-items: center;
}

.container-layout {
   height: 220px;
}

@media screen and (min-width: 700px) {
   .container-layout {
      margin-top: 2em;
   }
}

@media screen and (min-width: 1200px) {
   .container-layout {
      width: 80%;
      margin: auto;
   }
}

.container-intro {
   background-color: #f2f9f4;
   width: 85%;
   height: 200px;
   margin: 1em auto;
   padding-top: 1.2em;
   border-radius: 1em;
}

.logo-malaga-event {
   background-color: black;
   width: 70px;
   height: 70px;
   border-radius: 100%;
   margin: auto;
   display: flex;
}

.logo-malaga-event h1 {
   width: min-content;
   height: min-content;
   margin: auto;
   font-size: 1.2em;
   font-weight: 600;
   color: #ffffff;
}
</style>
