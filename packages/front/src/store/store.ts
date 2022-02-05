import { makeAutoObservable, spy } from 'mobx'
import { TModalManager, TNavigation } from './storeTypes'

class TodoStore {
  constructor(
    public page: TNavigation = { pageTag: 'main', title: 'Дорожки' },
    public ModalManager: TModalManager = {}
  ) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  goToPage = (page: TNavigation['pageTag']) => {
    switch (page) {
      case 'main':
        this.page = {
          pageTag: 'main',
          title: 'Дорожки',
        }
        break

      case 'setting': {
        this.page = {
          pageTag: 'setting',
          title: 'Настройки',
        }
        break
      }

      default:
        break
    }
  }
}

export default new TodoStore()

if (import.meta.env.MODE === 'development') {
  spy(event => {
    if (event.type === 'action') {
      console.log(`${event.name} with args: ${JSON.stringify(event.arguments)}`)
    }
  })
}
