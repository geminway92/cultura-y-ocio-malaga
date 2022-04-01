import { screen, render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import { waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'


import { createStore } from 'vuex'

import ForgetPassword from '../../../../../src/modules/auth/views/ForgetPassword.vue'


describe('<ForgetPassword/>', () => {

  beforeEach(() => {
    window.console.warn = jest.fn()
  });

  test('debe renderizar bien', async () => {

    const storeInstance = createStore({
      modules: {
        auth: {
          namespaced: true,
          actions: {
            changePassword() {
              return {ok: false, message: 'INVALID_EMAIL'}
            }
          }
        }
      }
    })

   const {getByRole} = render(ForgetPassword, {
    global: {
      plugins: [storeInstance]
    }
   })
    const buttonPasword = await getByRole('button', {name: 'Solicitar Contraseña'})

    await waitFor(() => {
      expect(buttonPasword).toBeVisible()
    })
  })

  describe('al hacer click en Solicitar contraseña...', () => {

    test('si el input email tiene un correo registrado debe aparecer un modal que diga Solicitud enviada', async () => {

      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            actions: {
              changePassword() {
                return {ok: true}
              }
            }
          }
        }
      })

      const mockRouter = {
        push: jest.fn()
      }

      render(ForgetPassword, {
        data(){
          return{
            email: 'geminway@live.com'
          }
        },
        global: {
          plugins: [storeInstance],
          mocks: {
            $router: mockRouter
          }
        }
      })

      await screen.getByRole('button', {name: 'Solicitar Contraseña'})
      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(screen.getByText('Solicitud enviada')).toBeVisible()
      })
    })

    test('si el email es correcto y está registrado debe pasar al router el párametro {name: "login"}', async () => {

      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            actions: {
              changePassword() {
                return {ok: true}
              }
            }
          }
        }
      })

      const mockRouter = {
        push: jest.fn()
      }

      render(ForgetPassword, {
        global: {
          plugins: [storeInstance],
          mocks: {
            $router: mockRouter
          }
        }
      })

      await screen.getByRole('button', {name: 'Solicitar Contraseña'})
      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith({"name": "login"})
      })
    })


    test('si no hay email debe aparecer un modal que diga que no hemos escrito ningún email', async () => {
      const storeInstance = createStore({
        modules: {
          auth: {
            namespaced: true,
            actions: {
              changePassword() {
                return {ok: false, message: 'MISSING_EMAIL'}
              }
            }
          }
        }
      })

      const mockRouter = {
        push: jest.fn()
      }

      const {getByText} = render(ForgetPassword, {
        global: {
          plugins: [storeInstance],
          mocks: {
            $router: mockRouter
          }
        }
      })

      await screen.getByRole('button', {name: 'Solicitar Contraseña'})
      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(getByText('No has escrito ningún email')).toBeVisible()
      })

    })
  })

})
