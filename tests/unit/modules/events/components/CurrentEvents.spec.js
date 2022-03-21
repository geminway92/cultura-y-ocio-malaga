import { screen, render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import {getByRole, waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import CurrentEvent from '../../../../../src/modules/events/components/CurrentEvent.vue'

describe('<CurrentEvent/>', () => {
  beforeEach(() => {
    render(CurrentEvent, {
      props: {
        filterMonthEvent: [
          {
            date: "2022-03-20",
            description: "Ir al FNAc para ver libros que nunca podremos comprar😁",
            id: "-MwCUExG54lZqS4A3uFY",
            joined: 2,
            name: "Día del lector 😁",
            photo: "https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg",
            register: ['', 'Gema', 'David'],
            schedule: "12:30"
          },
          {
            date: "2022-03-25",
            description: "Ricardo Arjona, el máximo exponente de la música latina, vuelve a España en su gira más exclusiva. Por primera vez en teatros en España, recorrerá las ciudades más importantes con suBLANCO Y NEGRO TOUR, la apuesta más atrevida del artista hasta el momento. Durante esta gira defenderá dos de los mejores discos de su carrera, “Blanco” y “Negro” grabados en los míticos estudios Abbey Road de Londres; además de hacer un repaso por los éxitos más emblemáticos de su fulminante trayectoria.Un momento excepcional donde el público podrá disfrutar de una cercania y experiencia única con el artista.",
            id: "-MydGwuJccvFfrdUCJWc",
            joined: 1,
            name: "Concierto Ricardo Arjona",
            photo: "https://res.cloudinary.com/ddn278n2q/image/upload/v1647812521/photoEvent/rhpqjlqth9m1gz4kmehh.jpg",
            register: ["", "Gema"]
          },
        ],
      }

    })
  })

  test('debe renderizar todos los eventos que recibe como props ', () => {
    const selectComponent = screen.getAllByTestId('container-event')
    expect(selectComponent.length).toBe(2)

  }),

  test('al clickear el botón de ver debe aparecer un modal con los nombres de los registrados', async () => {
    const buttonWatch = screen.getAllByRole('button', {name: 'Ver'})

    await userEvent.click(buttonWatch[0])
    expect(screen.getByRole('h5', {name: 'Horario:'}))
  })

})


