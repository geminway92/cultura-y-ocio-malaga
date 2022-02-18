import axios from 'axios'

const getUpdatePhoto = async file => {
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('upload_preset', 'photoProfile')
    formData.append('file', file)

    const url = 'https://api.cloudinary.com/v1_1/ddn278n2q/image/upload'
    const { data } = await axios.post(url, formData)
    console.log(data)

    return data.secure_url
  } catch (error) {
    console.error('Error al cargar la imagen')
    console.log(error)
    return null
  }
}

export default getUpdatePhoto
