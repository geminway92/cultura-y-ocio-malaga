import { screen, render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import { getByRole, waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'

import Login from '../../../../../src/modules/auth/views/Login.vue'
import Register from '../../../../../src/modules/auth/views/Register.vue'
import eventLayout from '../../../../../src/modules/events/layout/EventLayout.vue'

import ForgetPassword from '../../../../../src/modules/auth/views/ForgetPassword.vue'

import routerReal from '../../../../../src/modules/events/router/index'

describe('<Login.vue/>', () => {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/forgetpassword',
        name: 'forgetpassword',
        component: ForgetPassword
      },
      {
        path: '/',
        name:"eventlayout",
        components: eventLayout
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'page404',
      }
    ]
  })

  describe('al hacer click en...', () => {

    //reiniciar router para siguiente test
    afterEach(()=> {
      router.options.history.push('/')
    })

    test('"Regístrate" debe ir a /register', async () => {


      const {findByText, getByText, getByTestId} = render(Login, {
        global: {
          plugins: [router],
        },
      })

      await expect(router.options.history.state.current).toBe('/'),
      expect(await findByText('Iniciar Sesión')).toBeInTheDocument()

      await userEvent.click(getByText('Regístrate'))

      await waitFor(() =>
      expect(router.options.history.state.current).toEqual('/register')
      )

    })

    test('"Olvidé la Contraseña" debe ir a /forgetpassword',async () => {

      const {findByText, getByText, getByTestId} = render(Login, {
        global: {
          plugins: [router],
        },
      })

      expect(router.options.history.state.current).toBe('/')

      const aLinkFollewPasword = await findByText('Olvidé la contraseña')
      expect(aLinkFollewPasword).toBeInTheDocument()

      await userEvent.click(aLinkFollewPasword)

      await waitFor(() =>
        expect(router.options.history.state.current).toBe('/forgetpassword')
      )

    })

    test('"Iniciar sesión" debe ir a /eventlayout si los campos están rellenos ', async () => {
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            actions: {
              signInUser() {
                return {ok: true,}
              }
            }
          }
        }
      })

      const mockRouter = {
        push: jest.fn()
      }

      const { getByRole, getByLabelText} = render(Login, {
        data(){
          return{
            userForm: {
              email: '',
              password: ''
            }
          }
        },
        global: {
          plugins: [storeInstance],
          mocks: {
            $router: mockRouter
          }
        },

      })
      const inputEmail = await getByLabelText('E-mail')
      const inputpassword = await getByLabelText('Contraseña')
      await userEvent.type(inputEmail, 'geminway@live.com')
      await userEvent.type(inputpassword, '123456')
      const buttonLogin = await getByRole('button', {name: 'Iniciar Sesión'})

      await userEvent.click(buttonLogin)
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith({"name": "eventlayout"})
      })




    })
    test('"Iniciar sesión" debe mostrar el error de swal si los campos de form están vacios', async () => {

      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            actions: {
              signInUser() {
                return {ok: false, message: 'EMAIL_NOT_FOUND'}
              }
            }
          }
        }
      })

      const mockRouter = {
        push: jest.fn()
      }

      const {findByText, getByRole} = render(Login, {
        data(){
          return{
            userForm: {
              email: '',
              password: ''
            }
          }
        },
        global: {
          plugins: [storeInstance],
          mocks: {
            $router: mockRouter,
          }
        },

      })


      const buttonLogin = await getByRole('button', {name: 'Iniciar Sesión'})

      await userEvent.click(buttonLogin)
      const swalTitle =  await findByText('Compruebe los datos')

      await waitFor(() =>
      expect(swalTitle).toBeVisible()
      )

    })

    test('"Iniciar sesión" debe no llamar al router ', async () => {

      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            actions: {
              signInUser() {
                return {ok: false, message: 'EMAIL_NOT_FOUND'}
              }
            }
          }
        }
      })

      const mockRouter = {
        push: jest.fn()
      }

      const { getByRole} = render(Login, {
        data(){
          return{
            userForm: {
              email: '',
              password: ''
            }
          }
        },
        global: {
          plugins: [storeInstance],
          mocks: {
            $router: mockRouter,
          }
        },

      })


      const buttonLogin = await getByRole('button', {name: 'Iniciar Sesión'})
      await userEvent.click(buttonLogin)

      await waitFor(() =>
        expect(mockRouter.push).toHaveBeenCalledTimes(0)
      )
    })

    test('"Anónimo" debe enviar en mock.push como parámetro { name: "eventlayout" }', async () => {

      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            actions: {
              userAnonimous() {}

            }
          }
        }
      })

      const mockRouter = {
        push: jest.fn()
      }

      const { getByRole} = render(Login, {
        global: {
          plugins: [storeInstance],
          mocks: {
            $router: mockRouter,
          }
        },

      })

      const buttonAnonimous = await getByRole('button', {name: 'Anónimo'})
      await userEvent.click(buttonAnonimous)
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith({"name": "eventlayout"})
      })
    })
  })

  test('should find a label E-mail', () => {
    render(Login)
    const emailInput = screen.getByLabelText('E-mail')

    expect(emailInput).toBeVisible()
  })

  test('should find a label Contraseña', () => {
    render(Login)
    const passwordInput = screen.getByLabelText('Contraseña')

    expect(passwordInput).toBeVisible()
  })


})
