import { screen, render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { waitFor} from '@testing-library/dom'


import CurrentEvent from '../../../../../src/modules/events/components/CurrentEvent.vue'

import { createStore } from 'vuex'


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

    test('debe de abrise un modal-swal que diga "Añadido al calendario" si el usuario no está inscrito al evento', async () =>{
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
            }
          },
          event: {
            namespaced: true,
            actions: {
              joinEventAction() {
                return {ok: true, message: 'Añadido al calendario'}
              },
            },
          }
        }
      })

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
      await waitFor(()  => {
        expect(screen.getByText('Añadido al calendario')).toBeVisible()
      })


    })

    test('debe de abrise un modal-swal que diga "Estabas inscrito" si el usuario no está inscrito al evento', async () => {
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            state: {
               user: {
                name: 'Gema',
                email: 'geminway@gmail.com',
                profilePicture: 'https://res.cloudinary.com/ddn278n2q/image/upload/v1635241873/PhotoByDefault/ecx55iufi8mxk7imvpcd.jpg'
              },
            }
          },
          event: {
            namespaced: true,
            actions: {
              joinEventAction() {},
            },
          }
        }
      })

     const {getByText} = render(CurrentEvent, {
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
        expect(getByText('Estabas inscrito')).toBeVisible()
      })

    })

  })
   describe('al clickear el botón "Unir" si el usuario no está logueado', () =>{
    test('debe de abrise un modal-swal que diga "Añadido al calendario" si el usuario no está inscrito al evento', async () => {
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            state: {
               user: {
                name: undefined,
                email: undefined,
                profilePicture: undefined
              },
            }
          },
          event: {
            namespaced: true,
            state:{
              eventRegister: []
            },
            actions: {
              updateEventAnonimous(){}
            },

          }
        }
      })

      const {getByText} = render(CurrentEvent, {
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
        expect(getByText('Añadido al calendario')).toBeVisible()
      })
    })

    test('debe de abrise un modal-swal que diga "Estabas inscritos" si el usuario no está inscrito al evento', async () => {
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            state: {
               user: {
                name: undefined,
                email: undefined,
                profilePicture: undefined
              },
            }
          },
          event: {
            namespaced: true,
            state:{
              eventRegister: [
                {
                  id:"anonimo",
                  startDate:"2022-03-20",
                  endDate:"2022-03-20",
                  title:"Día del lector 😁",
                  classes:"purple"
                }

              ]
            },
            actions: {
              updateEventAnonimous(){}
            },

          }
        }
      })

      const {getByText} = render(CurrentEvent, {
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
        expect(getByText('Estabas inscrito')).toBeVisible()
      })
    })

  })

})


