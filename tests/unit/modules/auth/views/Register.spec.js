import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import {getByRole, waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'

import Register from '../../../../../src/modules/auth/views/Register.vue'
import Login from '../../../../../src/modules/auth/views/Login.vue'

describe('<Register/>', () => {

  beforeEach(() => {
    window.console.warn = jest.fn()
  });

  test('cuando haces click en "Inicia Sesion debe ir a /', async () => {

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
      ]
    })

    const {findByText, getByText} = render(Register, {
      global: {
        plugins: [router],
      },
    })
    router.options.history.push('/register')
    await expect(router.options.history.state.current).toBe('/register'),
    expect(await findByText('Inicia Sesión')).toBeInTheDocument()

    await userEvent.click(getByText('Inicia Sesión'))

    await waitFor(() =>
    expect(router.options.history.state.current).toEqual('/')
    )

  })


})
