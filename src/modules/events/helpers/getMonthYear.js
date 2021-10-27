const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const getDayMonthYear = ( ) => {

    const date = new Date()

    return {
        day: date.getDate(),
        month: months[ date.getMonth() ],
        year: date.getFullYear(),
        monthNumber: date.getMonth()
    }

}

export default getDayMonthYear