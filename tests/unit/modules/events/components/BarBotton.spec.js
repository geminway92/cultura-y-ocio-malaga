import { screen, render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { waitFor} from '@testing-library/dom'

import BarBottom from '../../../../../src/modules/events/components/BarBotton.vue'

describe('<BarBotton/>', () => {

  test('El botón Crear evento debe estar visible si el usuario está registrado', () => {
   const {getByRole} = render(BarBottom, {
      props: {
          userLogin: {
            name:"Gema",
            email:"geminway@live.com",
            profilePicture:"https://res.cloudinary.com/ddn278n2q/image/upload/v1647648854/ProfileTodo/hrcqggaj0kjd2lmntcru.jpg"
          }
      }
    })
    const buttonCreateEvent = getByRole('button', {name: 'Crear evento'})
    expect(buttonCreateEvent).toBeVisible()

  })

  test('El botón Crear evento debe estar visible si el usuario NO está registrado', () => {
    const {getByRole} = render(BarBottom, {
       props: {
          userLogin: {
            name: undefined,
            email: undefined,
            profilePicture: undefined
          }
       }
     })
     const buttonCreateEvent = getByRole('button', {name: 'Crear evento'})
     expect(buttonCreateEvent).toBeVisible()

  })

  test('El botón Calendario debe estar visible si está registrado', () => {
    const {getByRole} = render(BarBottom, {
      props: {
          userLogin: {
            name:"Gema",
            email:"geminway@live.com",
            profilePicture:"https://res.cloudinary.com/ddn278n2q/image/upload/v1647648854/ProfileTodo/hrcqggaj0kjd2lmntcru.jpg"
          }
      }
    })
    const buttonCalendary = getByRole('button', {name: 'Calendario'})
    expect(buttonCalendary).toBeVisible()
  })

  test('El botón Calendario debe estar visible si no está registrado ni logueado', () => {
    const {getByRole} = render(BarBottom, {
      props: {
          userLogin: {
            name: undefined,
            email:undefined,
            profilePicture: undefined
          }
      }
    })
    const buttonCalendary = getByRole('button', {name: 'Calendario'})
    expect(buttonCalendary).toBeVisible()
  })

  test('El botón Perfil debe estar visible si el usuario está registrado y logueado', () => {
    const {getByRole} = render(BarBottom, {
      props: {
        userLogin: {
          name:"Gema",
          email:"geminway@live.com",
          profilePicture:"https://res.cloudinary.com/ddn278n2q/image/upload/v1647648854/ProfileTodo/hrcqggaj0kjd2lmntcru.jpg"
        }
      }
    })
    const buttonCalendary = getByRole('button', {name: 'Perfil'})
    expect(buttonCalendary).toBeVisible()
  })

  test('El botón Perfil debe no estar visible si el usuario  NO está registrado y logueado', () => {
    const {getAllByRole} = render(BarBottom, {
      props: {
        userLogin: {
          name: undefined,
          email:undefined,
          profilePicture: undefined
        }
      }
    })
    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(2)
  })

  test('Al hacer click en Crear Evento debe emitir openModalCreateEvent', async () => {

    const {getByRole, emitted} = render(BarBottom, {
      props: {
        userLogin: {
          name: undefined,
          email:undefined,
          profilePicture: undefined
        }
      }
    })

    const buttonCreateEvent = getByRole('button', {name: 'Crear evento'})
    await userEvent.click(buttonCreateEvent)

    await waitFor(() => {
      expect(emitted().openModalCreateEvent).toBeTruthy()
    })

  })
  test('Al hacer click en Calendario debe mandar a llamar a la ruta calendar', async () => {

    const mockRouter = {
      push: jest.fn()
    }

    const {getByRole} = render(BarBottom, {
      props: {
        userLogin: {
          name: undefined,
          email:undefined,
          profilePicture: undefined
        }
      },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    const buttonCalendar = getByRole('button', {name: 'Calendario'})
    await userEvent.click(buttonCalendar)

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({ name: 'calendar' })
      expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })

  })

  test('Al hacer click en Perfil debe mandar a llamar a la ruta profile', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    const {getByRole} = render(BarBottom, {
      props: {
        userLogin: {
          name:"Gema",
          email:"geminway@live.com",
          profilePicture:"https://res.cloudinary.com/ddn278n2q/image/upload/v1647648854/ProfileTodo/hrcqggaj0kjd2lmntcru.jpg"
        }
      },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    const buttonCalendar = getByRole('button', {name: 'Perfil'})
    await userEvent.click(buttonCalendar)

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({ name: 'profileUser' })
      expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })

  })
})
