import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import CreateEventModal from '../../../../../src/modules/events/components/CreateEventModal.vue'

describe('<CreateEventModal/>',() => {

  test('al renderizar el botón "Crear" debe estar desactivado', async () => {
    const {getByRole} = render(CreateEventModal)
    const buttonCreate = await getByRole('button', {name: 'Crear'})

    expect(buttonCreate).toBeDisabled()
  })

  describe('Si relleno todos los campos del formulario...', () => {

    beforeEach(() => {
      window._virtualConsole.emit = jest.fn();
      window.console.warn = jest.fn()
    });

    test('el botón Crear debe estar activado', async () => {

      const {getByRole, getByLabelText} = render(CreateEventModal, {
        data(){
          return{
            newEvent: {
              name: '',
              schedule: '10:00',
              date: '2022-03-28',
              description: 'Esta es la descripción',
              photo: 'www.foto.com',
            },
          }
        }
      })

      await userEvent.type(getByLabelText('Nombre'), 'Gema')

      const buttonCreate = await getByRole('button', {name: 'Crear'})
      expect(buttonCreate).not.toBeDisabled()


    })

    test('y hago click en Crear debe hacer emit de createNewEvent con los datos correctos', async () => {

      const {getByRole, getByLabelText, emitted} = render(CreateEventModal, {
        data(){
          return{
            newEvent: {
              name: '',
              schedule: '10:00',
              date: '2022-03-28',
              description: 'Esta es la descripción',
              photo: 'www.foto.com',
            },
          }
        }
      })

      await userEvent.type(getByLabelText('Nombre'), 'Gema')

      await userEvent.click(getByRole('button', {name: 'Crear'}))

      expect(emitted().createNewEvent).toBeTruthy()

    })

    test('y hago click en Crear debe hacer emit de openModalCreateEvent', async () => {

      const {getByRole, getByLabelText, emitted} = render(CreateEventModal, {
        data(){
          return{
            newEvent: {
              name: '',
              schedule: '10:00',
              date: '2022-03-28',
              description: 'Esta es la descripción',
              photo: 'www.foto.com',
            },
          }
        }
      })

      await userEvent.type(getByLabelText('Nombre'), 'Gema')

      await userEvent.click(getByRole('button', {name: 'Crear'}))

      expect(emitted().openModalCreateEvent).toBeTruthy()

    })

    /*test('y hago click en Crear debe de resetear todos los campos del form', async () => {

      const {getByRole, getByLabelText} = render(CreateEventModal, {
        data(){
          return{
            newEvent: {
              name: '',
              schedule: '10:00',
              date: '2022-03-28',
              description: 'Esta es la descripción',
              photo: 'www.foto.com',
            },
          }
        }
      })

      await userEvent.type(getByLabelText('Nombre'), 'Gema')

      await userEvent.click(getByRole('button', {name: 'Crear'}))

      expect(getByLabelText('Nombre')).toBe()

    })*/

  })

  describe('Si no relleno todos los campos del formulario...', () =>{
    test.todo('y hago click en Crear no debe hacer emit de createNewEvent')
    test.todo('y hago click en Crear no debe hacer emit de openModalCreateEvent')
    test.todo('y hago click en Crear no debe resetear los campos del form')
  })

})
