import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'

import { getByRole, getByText, waitFor} from '@testing-library/dom'


import EventModal from '../../../../../src/modules/events/components/EventModal.vue'

describe('<EventModal/>', () =>{
  test('debe imprimir el nombre del evento', async () => {
    const {getByText} = render(EventModal, {
      props: {
        openModalIsTrue: true,
        eventForModal: {
          date: "2022-04-20",
          description: "Ir al FNAc para ver libros que nunca podremos comprar😁",
          id: "-MwCUExG54lZqS4A3uFY",
          joined: 2,
          name: "Día del lector 😁",
          photo: "https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg",
          register: [
            "",
            "Gema",
            "David"
            ],
          schedule: "12:30"
        }
      }
    })

    await expect(getByText('Día del lector 😁')).toBeTruthy()

  })
  test('debe imprimir la fecha del evento', async () => {
    const {getByText} = render(EventModal, {
      props: {
        openModalIsTrue: true,
        eventForModal: {
          date: "2022-04-20",
          description: "Ir al FNAc para ver libros que nunca podremos comprar😁",
          id: "-MwCUExG54lZqS4A3uFY",
          joined: 2,
          name: "Día del lector 😁",
          photo: "https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg",
          register: [
            "",
            "Gema",
            "David"
            ],
          schedule: "12:30"
        }
      }
    })

    await expect(getByText("2022-04-20")).toBeTruthy()

  })

  test('debe imprimir el horario del evento', async () => {
     const {getByText} = render(EventModal, {
      props: {
        openModalIsTrue: true,
        eventForModal: {
          date: "2022-04-20",
          description: "Ir al FNAc para ver libros que nunca podremos comprar😁",
          id: "-MwCUExG54lZqS4A3uFY",
          joined: 2,
          name: "Día del lector 😁",
          photo: "https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg",
          register: [
            "",
            "Gema",
            "David"
            ],
          schedule: "12:30"
        }
      }
    })

    await expect(getByText("12:30")).toBeTruthy()

  })

  test('debe imprimir la imagen del evento', async () => {
    const {getByRole} = render(EventModal, {
      props: {
        openModalIsTrue: true,
        eventForModal: {
          date: "2022-04-20",
          description: "Ir al FNAc para ver libros que nunca podremos comprar😁",
          id: "-MwCUExG54lZqS4A3uFY",
          joined: 2,
          name: "Día del lector 😁",
          photo: "https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg",
          register: [
            "",
            "Gema",
            "David"
            ],
          schedule: "12:30"
        }
      }
    })

    await expect(getByRole('img').src).toBe('https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg')

  })
})
