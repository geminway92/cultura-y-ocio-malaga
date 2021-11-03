<template>
    <div @click.self="this.$emit('openModalName')" class="container-modal">
        <div class="modal">
                <div class="container-description">
                    <h1>Inscritos en el evento</h1>
                    <ul v-for="name in nameRegister" :key="name">
                        <li>{{name}}</li>
                    </ul>
                </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        modalNameIsTrue:{
            type: Boolean,
            default: false
        },
        nameRegister:{
            type: Array
        }
        
    },
    

}
</script>

<style scoped>

ul{
    margin: auto;
    padding: .2em;
}

h1{
    color: var(--colorPrimary);

}

.container-modal{
    background-color: rgba(116, 111, 111, 0.295);
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 3;
    display: flex;
}

.modal{
    background-color: #ffffff;
    width: 65%;
    height: 300px;
    margin: auto;
    border-radius: 15px;
    box-shadow: 4px 3px 4px #746f6f4b;
    overflow: scroll;
    overflow-x: hidden;
}

@media screen and (width: 320px){
    .container-modal{
        position: absolute;
        top: -3em;
        height: 660px;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
}

.container-description li{
    list-style: none;
}


</style>