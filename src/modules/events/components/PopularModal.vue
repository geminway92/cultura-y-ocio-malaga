<template>
    <div @click.self="this.$emit('showEvent')" class="container-modal">
        <div class="modal">
                <h1>{{this.event.name}}</h1>
                <div class="container-description">
                    <img v-if="this.event.photo" :src="this.event.photo" alt="">
                    <img v-else src="../../../assets/images/categoria-sin-nombre.jpg" alt="">
                        <h5 class="description-item"><span>Fecha: </span>{{this.event.date}}</h5>
                        <h5 class="description-item"><span>Horario: </span>{{this.event.schedule}}</h5>
                    <p class="description-item">{{this.event.description}}</p>

                </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        openPopularModal:{
            type: Boolean,
            default: false
        },
        event:{
            type: Object
        }
        
    },
    

}
</script>

<style scoped>

img{
    width: 150px;
    border-radius: 15px;
}

p{
    margin: 1em;
    text-align: start;
    font-size: .9em;
    font-weight: 500;
}


.container-modal{
    background-color: rgba(116, 111, 111, 0.295);
    position: absolute;
    top: 0;
    width: 100vw;
    height: 650px;
    z-index: 3;
    display: flex;
}

@media screen and (min-width: 380px) {
    .container-modal{
        height: 100vh;
        /* background-color: royalblue; */
    }
}

.modal{
    background-color: #ffffff;
    width: 90%;
    height: 300px;
    margin: auto;
    border-radius: 15px;
    box-shadow: 4px 3px 4px #746f6f4b;
    overflow: scroll;
    overflow-x: hidden;
}

@media screen and (min-width: 1200px) {
    .modal{
        width: 600px;
        height: 400px;
    }
}

.modal::-webkit-scrollbar{
    width: 10px;
}

.modal::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #ada9a9;
    width: 10px;
    height: 20px;
}

.container-description{
    width: 90%;
    margin: auto;
}

.description-item{
    margin: 0.5em 0;
    text-align: start;
}

</style>