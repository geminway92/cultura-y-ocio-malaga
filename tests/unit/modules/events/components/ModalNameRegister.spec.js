import { render, screen, } from '@testing-library/vue'
import '@testing-library/jest-dom'

import ModalNameRegister from '../../../../../src/modules/events/components/ModalNameRegister.vue';


describe('<ModalNameRegister/>', () => {
  test('debe aparecer el nombre de los registrados', async () => {
    render(ModalNameRegister, {
      props: {
        nameRegister: [
          "",
          "Gema",
          "David"
        ]
      }
    })

    expect(screen.getByText('Gema')).toBeVisible()
    expect(screen.getByText('David')).toBeVisible()
  })
})
