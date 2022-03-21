import { screen, render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import { waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'

import Login from '../../../../../src/modules/auth/views/Login.vue'
import Register from '../../../../../src/modules/auth/views/Register.vue'
import eventLayout from '../../../../../src/modules/events/layout/EventLayout.vue'

import ForgetPassword from '../../../../../src/modules/auth/views/ForgetPassword.vue'

import {store} from '../../../../../src/modules/auth/store/auth/index'


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

      //reiniciar router para siguiente test
      router.options.history.push('/')
    })

    test.todo('"Iniciar sesión" debe ir a /eventlayout si los campos están rellenos ')
    test('"Iniciar sesión" debe seguir en la ruta / si los campos de form están vacios', async () => {
      const storeInstance = createStore(store)
      const resp = {ok: true}

      jest.spyOn(Login.methods, 'signInUser').mockResolvedValueOnce(resp)

      const {findByText, getByText, getByRole} = render(Login, {

        global: {
          plugins: [router, storeInstance],
        },
      })


      const buttonLogin = await getByRole('button', {name: 'Iniciar Sesión'})

      // await userEvent.click(buttonLogin)

    })

    test.todo('"Anónimo" debe ir a /eventlayout')
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
