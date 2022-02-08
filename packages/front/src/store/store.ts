import { makeAutoObservable, runInAction, spy } from 'mobx'
import { TLaneInfo, TLanesInfo, TModalManager, TNavigation } from './storeTypes'

// eslint-disable-next-line no-promise-executor-return
const TIMEOUT = (time: number = 1000) => new Promise<void>(resolve => setTimeout(resolve, time))

class TodoStore {
  constructor(
    // public page: TNavigation = { pageTag: 'main', title: 'Дорожки' },
    public page: TNavigation = { pageTag: 'lane', title: 'Дорожка', idLine: 0 },
    public modalManager: TModalManager = {},
    public lanesInfo: TLanesInfo = [
      {
        id: 0,
        name: 'Дорожка 13',
        status: true,
        interval: {
          speed: 90,
          distance: 500,
          rest: 20,
          repeat: 2,
          tempo: 400,
          progress: 30,
        },
      },
      {
        status: true,
        id: 1,
        name: 'Дорожка 2',
      },
      {
        status: false,
        id: 2,
        name: 'Дорожка 3',
      },
    ],
    public laneInfo: TLaneInfo = {
      id: 0,
      isLoading: false,
      isRunning: true,
      intervals: [
        {
          name: 'some interval',
          speed: 90,
          distance: 500,
          rest: 20,
          repeat: 2,
          tempo: 400,
          progress: 30,
        },
        {
          name: 'some interval2',
          speed: 90,
          distance: 500,
          rest: 20,
          repeat: 2,
          tempo: 400,
          progress: 30,
        },
      ],
    }
  ) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // Extract<TRequests, { url: 'api/trackconnect' }>['payload']
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

  goToLane = (pageNumber: Extract<TNavigation, { title: 'Дорожка' }>['idLine']) => {
    this.page = {
      pageTag: 'lane',
      title: 'Дорожка',
      idLine: pageNumber,
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

  toggleLaneStatus = (laneId: number, action: 'OFF' | 'ON') => {
    const lane = this.lanesInfo[laneId]
    if (lane) {
      lane.status = action === 'ON'
    }
  }
  // Данные о странице
}

const store = new TodoStore()
export default store

if (import.meta.env.MODE === 'development') {
  spy(event => {
    if (event.type === 'action') {
      console.log(`${event.name} with args: ${JSON.stringify(event.arguments)}`)
    }
  })
}
