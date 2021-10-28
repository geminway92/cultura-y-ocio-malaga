<template>
    <div @click.self="this.$emit('openModal')" class="container-modal">
        <div class="modal">
            <h1> {{eventForModal[0].NOMBRE}}</h1>
            <div class="container-description">

                <h5 class="description-item"><span>Categorias: </span>{{eventForModal[0].CATEGORIA}}</h5>
                <h5 class="description-item"><span>Destinados: </span>{{eventForModal[0].DESTINATARIOS_DESCRIPCION}}</h5>
                <h5 class="description-item"><span>Fecha inicio: </span>{{eventForModal[0].F_INICIO}}</h5>
                <h5 class="description-item"><span>Fecha fin: </span>{{eventForModal[0].F_FIN}}</h5>
                <h5 class="description-item"><span>Horario: </span>{{eventForModal[0].HORARIO}}</h5>
                <h5 class="description-item"><span>Email: </span>{{eventForModal[0].E_MAIL}}</h5>
                <h5 class="description-item"><span>Dirección Web </span>{{eventForModal[0].DIRECCION_WEB}}</h5>
                <h5 class="description-item"><span>Teléfono: </span>{{eventForModal[0].TELEFONO}}</h5>
                <h5 class="description-item"><span>Evento: </span>{{eventForModal[0].EVENTO}}</h5>
            </div>
                <p>{{eventForModal[0].DESCRIPCION}}</p>

        </div>

    </div>
</template>

<script>
export default {
    props:{
        openModalIsTrue:{
            type: Boolean,
            default: false
        }
    },
    props:{
        eventForModal:{
            type: Object
        }
    }
    

}
</script>

<style scoped>

p{
    margin: 1em;
    text-align: start;
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
    width: 90%;
    height: 300px;
    margin: auto;
    border-radius: 15px;
    box-shadow: 4px 3px 4px #746f6f4b;
    overflow: scroll;
    overflow-x: hidden;
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
    text-align: start;
}

.description-item{
    margin: 0.5em 0;
}
</style>