import axios from 'axios'  // importar axios importante

const uploadImage = async ( file ) => {         //Necesito el file(el archivo a subir)
    
    if ( !file  ) return                // evaluar que si el archivo no existe se salga

    try{

        const formData = new FormData()                   //no se importa, viene propio de JS
        formData.append('upload_preset','photoEvent')  //journal o el valor que le hemos dado en cloudinary
        formData.append('file', file)  // poner archivo que deseo subir y el archivo literalmente 'file'

        const url = 'https://api.cloudinary.com/v1_1/ddn278n2q/image/upload' // url que probamos en postman
        const {data} = await axios.post(url, formData) //mando el url y el formData que tenemos aquí

        return data.secure_url

    } catch ( error ) {
        console.error('Error al cargar la imagen, revisar logs')
        console.log(error)
        return null

    }

}

export default uploadImage // exportar para utilizar en otro archivo