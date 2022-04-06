import { render, screen, } from '@testing-library/vue'
import '@testing-library/jest-dom'

import { findAllByText, waitFor} from '@testing-library/dom'
import { createStore } from 'vuex'


import {events,eventRegister} from '../../../../../src/modules/events/store/event/state'
import { LOAD_EVENT_MUTATION, SET_EVENT_USER} from '../../../../../src/modules/events/store/event/mutations'
import {loadEventAction, loadEventUser, loadEventAnonimous, updateEventAnonimous, resetState} from '../../../../../src/modules/events/store/event/actions'


import EventLayout from '../../../../../src/modules/events/layout/EventLayout.vue';



describe('<EventLayout/>', () => {
  describe('Si hay eventos...', () => {
    beforeEach(() => {
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            state: {
              user: {
                "name": "Gema",
                "email": "geminway@live.com",
                "profilePicture": "https://res.cloudinary.com/ddn278n2q/image/upload/v1647648854/ProfileTodo/hrcqggaj0kjd2lmntcru.jpg"

              }
            }
          },
          event: {
            namespaced: true,
            state: {
              events: () => events,
              eventRegister: () => eventRegister
            },
            actions: {
              loadEventAction,
              loadEventUser,
              loadEventAnonimous,
              updateEventAnonimous,
              resetState
            },
            mutations: {
              SET_EVENT_USER,
              LOAD_EVENT_MUTATION
            }
          }
        },
      })

      render(EventLayout, {
        global: {
          plugins: [storeInstance],
        }
      })

    })

    test('debe aparecer el evento "Día del lector 😁" dos veces', async () => {

      const titleEvent = await screen.findAllByText('Día del lector 😁', findAllByText,  waitFor)

      await waitFor(() => {
        expect(titleEvent.length).toBe(2)
      })


    })

    test('debe aparecer el evento "Concierto Ricardo Arjona" dos veces', async () => {

      const titleEvent = await screen.findAllByText('Concierto Ricardo Arjona', findAllByText,  waitFor)

      expect(titleEvent.length).toBe(2)


    })

    test('debe aparecer el evento "Feria" una vez', async () => {

      const titleEvent = await screen.findAllByText('Feria', findAllByText,  waitFor)

      expect(titleEvent.length).toBe(1)
    })


  }),

  describe('Si no hay eventos debe aparecer...', () => {
    test('dos h2 que diga "No hay eventos"', async () => {
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            state: {
              user: {
                "name": "Gema",
                "email": "geminway@live.com",
                "profilePicture": "https://res.cloudinary.com/ddn278n2q/image/upload/v1647648854/ProfileTodo/hrcqggaj0kjd2lmntcru.jpg"

              }
            }
          },
          event: {
            namespaced: true,
            state: {
              events: () => [],
              eventRegister: () => []
            },
            actions: {
              loadEventAction: () => jest.fn(),
              loadEventUser: () => jest.fn(),
            },

          }
        },
      })

      render(EventLayout, {
        global: {
          plugins: [storeInstance],
        }
      })
      const titleCardEvent = await screen.findAllByText('No hay eventos', findAllByText,  waitFor)

      expect(titleCardEvent.length).toBe(2)
    })
  })

})
