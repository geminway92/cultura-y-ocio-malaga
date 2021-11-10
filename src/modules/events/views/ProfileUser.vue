<template>
   <header>
      <div class="container-header">
         <i class="fas fa-chevron-left icon-back"></i>
         <h2>Ajuste</h2>
      </div>
   </header>
   <body>
      <h1 class="title-name">Hola (nombre)</h1>
      <img class="profile-photo" src="../../../assets/images/2.jpg" alt="" />
      <hr />
      <h4>Perfil</h4>

      <div class="container-ul">
         <ul>
            <li>
               Cambiar nombre
               <i class="fas fa-chevron-right"></i>
            </li>
            <li>
               Cambiar foto de perfil
               <i class="fas fa-chevron-right"></i>
            </li>
            <li>
               Cambiar contraseña
               <i class="fas fa-chevron-right"></i>
            </li>
         </ul>
      </div>

      <button>Cerrar sesión</button>
   </body>
</template>

<script>
export default {
   name: 'profileUser'
};
</script>

<style scoped>
header {
   background-color: #b128c3;
   color: white;
   width: 100vw;
   height: 80px;
   display: flex;
   justify-content: end;
}

h2 {
   margin: auto;
}

hr {
   background-color: #b128c3;
   width: 80%;
}

button {
   background-color: #b128c3;
   border: none;
   border-radius: 15px;
   padding: 0.7em;
   margin-top: 0.5em;
   color: white;
}

button:active {
   background-color: #8e239c;
}

.container-header {
   display: flex;
   width: 100%;
   flex-direction: row;
   margin: auto;
}

.icon-back {
   display: flex;
   height: min-content;
   font-size: 1.5em;
   position: relative;
   left: 1em;
}

.title-name {
   color: black;
}

.profile-photo {
   width: 70px;
   border-radius: 100%;
}

.container-ul {
   width: max-content;
   margin: auto;
}

.container-ul ul {
   list-style: none;
   width: 200px;
   display: flex;
   flex-direction: column;
   justify-content: start;
   margin: auto;
}

.container-ul li {
   width: 220px;
   display: flex;
   justify-content: space-between;
   border: 1px solid #aeaeae;
   border-radius: 3px;
   padding: 0.7em;
   position: relative;
   left: -40px;
}

.fa-chevron-right {
   color: #aeaeae;
}
</style>
