import { render, screen, } from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { waitFor} from '@testing-library/dom'

import ListEventsModal from '../../../../../src/modules/events/components/ListEventsModal.vue';

describe('<ListEventsModal/>', () => {

  let mockRouter;
  beforeEach(() =>{
    mockRouter = {
      push: jest.fn()
    }

   render(ListEventsModal, {
      props: {
        openModalSearch: true,
        searchEventFilter: [
          {
            "date": "2022-04-20",
            "description": "Ir al FNAc para ver libros que nunca podremos comprar😁",
            "id": "-MwCUExG54lZqS4A3uFY",
            "joined": 2,
            "name": "Día del lector 😁",
            "photo": "https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg",
            "register": [
              "",
              "Gema",
              "David"
            ],
            "schedule": "12:30"
          },
          {
            "date": "2022-04-25",
            "description": "Ricardo Arjona, el máximo exponente de la música latina, vuelve a España en su gira más exclusiva. Por primera vez en teatros en España, recorrerá las ciudades más importantes con suBLANCO Y NEGRO TOUR, la apuesta más atrevida del artista hasta el momento. Durante esta gira defenderá dos de los mejores discos de su carrera, “Blanco” y “Negro” grabados en los míticos estudios Abbey Road de Londres; además de hacer un repaso por los éxitos más emblemáticos de su fulminante trayectoria.Un momento excepcional donde el público podrá disfrutar de una cercania y experiencia única con el artista.",
            "id": "-MydGwuJccvFfrdUCJWc",
            "joined": 1,
            "name": "Concierto Ricardo Arjona",
            "photo": "https://res.cloudinary.com/ddn278n2q/image/upload/v1647812521/photoEvent/rhpqjlqth9m1gz4kmehh.jpg",
            "register": [
              "",
              "Gema"
            ],
            "schedule": "20:30"
          },
          {
            "date": "2022-04-17",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius facilisis commodo. Nunc ornare sodales dictum. Nulla lorem ex, luctus nec luctus a, semper at magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque porttitor ultrices nibh, pulvinar hendrerit magna malesuada sit amet. Suspendisse in tempor tortor, quis luctus massa. Pellentesque leo enim, ullamcorper vitae convallis nec, dapibus sit amet sapien. Sed interdum ac turpis a lobortis. Vivamus ultrices fermentum velit. Nam porttitor auctor fringilla.",
            "id": "-MzQ9Ty5keDiClv09vVz",
            "name": "Feria",
            "photo": "https://res.cloudinary.com/ddn278n2q/image/upload/v1648649430/photoEvent/msri2srnyixdjhblkdqx.png",
            "schedule": "11:11"
          }
        ]
      },
      global:{
        mocks:{
          $router: mockRouter
        }
      }
    })

  })

  test('cuando renderice debe imprimir la imagen del evento filtrado ', async ()  => {

    const imgTag = await screen.getAllByRole('img')
    expect(imgTag[0].src).toBe('https://res.cloudinary.com/ddn278n2q/image/upload/v1645198724/photoEvent/ravameoh4whk0z9pjb0l.jpg')

  })

  test('cuando renderice debe imprimir el título del evento filtrado', async () => {

    expect(await screen.getByText('Día del lector 😁')).toBeVisible()

  })

  test('si hago click en li debe llamar hacer emmit openEvent al router  con estos parámetros {name: "event-id",params: { id: event.id} }', async () => {

    const liTags = await screen.getAllByTestId('li-title')

    await userEvent.click(liTags[0])
    await waitFor(()=> {
      expect(mockRouter.push).toHaveBeenCalledWith({"name": "event-id", "params": {"id": "-MwCUExG54lZqS4A3uFY"}})

    })

  })
})
