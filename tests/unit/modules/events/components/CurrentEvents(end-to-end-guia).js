import { screen, render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { waitFor} from '@testing-library/dom'

import CurrentEvent from '../../../../../src/modules/events/components/CurrentEvent.vue'

import { createStore } from 'vuex'

import Swal from "sweetalert2";

//import modules store
import {joinEventAction, addEventUser} from '../../../../../src/modules/events/store/event/actions'

describe('<CurrentEvent/>', () => {

  const filterMonthEvent = [
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
  ]


  test('debe renderizar todos los eventos que recibe como props ', () => {
    render(CurrentEvent, {
      props: {
        filterMonthEvent
      },

    })
    const selectComponent = screen.getAllByTestId('container-event')
    expect(selectComponent.length).toBe(2)
  }),

  test('al clickear el botón "Ver" debe recibir OpenModal el evento que di click', async () => {
   const {emitted} = render(CurrentEvent, {
        props: {
          filterMonthEvent
        },

      })

    const buttonWatch = screen.getAllByRole('button', {name: 'Ver'})
    await userEvent.click(buttonWatch[0])
    expect(emitted().openModal).toEqual([[filterMonthEvent[0]]])
    expect(emitted().openModal).not.toEqual([[filterMonthEvent[1]]])
  })

  test('al clickear el botón "Inscritos" debe recibir openModalName los usuarios registrados a ese evento', async () => {
    const {emitted} = render(CurrentEvent, {
         props: {
           filterMonthEvent
         },

       })

     const join = screen.getAllByTestId('container-name-register')

     await userEvent.click(join[0])
     expect(emitted().openModalName).toEqual([[filterMonthEvent[0].register]])
     expect(emitted().openModalName).not.toEqual([[filterMonthEvent[1].register]])
  })

  describe('al clickear el botón "Unir" si el usuario está logueado', () =>{
    test('debe de recibir joinEvent el evento que he clickeado si el usuario no está inscrito al evento', async () =>{
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            state: {
               user: {
                name: 'test',
                email: 'test@gmail.com',
                profilePicture: 'https://res.cloudinary.com/ddn278n2q/image/upload/v1635241873/PhotoByDefault/ecx55iufi8mxk7imvpcd.jpg'
              },
              idToken: null,
              refreshToken: null
            }
          },
          event: {
            namespaced: true,
            actions: {
              joinEventAction,
              addEventUser
            },
            mutations: {
              joinEventMutation: () => {}
            }
          }
        }
      })

      jest.mock('sweetalert2', () => ({
        fire: jest.fn(),
        showLoading: jest.fn(),
        close: jest.fn()
      }))
        render(CurrentEvent, {
        props: {
          filterMonthEvent
        },
        global: {
          plugins: [storeInstance],
        }

      })

        const join = screen.getAllByRole('button', {name: 'Unir'})

        await userEvent.click(join[0])
        await waitFor(() => {

          expect(Swal.fire).toBeVisible()

        })
        // expect(emitted().joinEvent).not.toEqual([[filterMonthEvent[1]]])
    })

    test.todo('debo no llamar a jointEvent')

  })
   describe('al clickear el botón "Unir" si el usuario no está logueado', () =>{
    test.todo('debe de recibir joinEvent el evento que he clickeado si mi nombre de usuario no está inscrito al evento')

    test.todo('debe de no aparecer mi nombre en inscritos')

    })

  describe('al clickear el botón "Unir" si el usuario es Anonimo', () =>{
    test.todo('debe de recibir joinEvent el evento que he clickeado si mi nombre de usuario no está inscrito al evento')

    test.todo('debe de no aparecer mi nombre en inscritos')

  })


})


