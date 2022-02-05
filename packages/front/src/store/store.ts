import { makeAutoObservable, runInAction, spy } from 'mobx'
import { TLanesInfo, TModalManager, TNavigation } from './storeTypes'

// eslint-disable-next-line no-promise-executor-return
const TIMEOUT = (time: number = 1000) => new Promise<void>(resolve => setTimeout(resolve, time))

class TodoStore {
  constructor(
    public page: TNavigation = { pageTag: 'main', title: 'Дорожки' },
    public modalManager: TModalManager = {},
    public lanesInfo: TLanesInfo = [
      {
        id: 0,
        name: 'Дорожка 13',
        interval: {
          speed: 90,
          distance: 500,
          rest: 20,
          repeat: 2,
          tempo: 400,
          progress: 0,
        },
      },

      {
        id: 1,
        name: 'Дорожка 2',
      },
    ]
  ) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // Смена страницы
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

  setInt = async () => {
    const { interval } = this.lanesInfo[1]
    if (interval) {
      for (let i = 0; i <= 10; i++) {
        setTimeout(() => runInAction(() => (interval.progress = i * 10)), i * 1000)
        console.log('setInt', i)
      }
    }
  }

  // Данные о странице
}

export default new TodoStore()

if (import.meta.env.MODE === 'development') {
  spy(event => {
    if (event.type === 'action') {
      console.log(`${event.name} with args: ${JSON.stringify(event.arguments)}`)
    }
  })
}
