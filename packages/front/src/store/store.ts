import { makeAutoObservable, runInAction, spy } from 'mobx'
import { TInterval, TLaneInfo, TLanesInfo, TModalManager, TNavigation } from './storeTypes'
import { TRequests } from '@monorepo/types'

import axios from 'axios'

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
    public laneInfo = {} as TLaneInfo
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

  getShortData = () => {
    type TReq = Extract<TRequests, { url: 'api/shortdata' }>['res']
    axios.post<TReq>('api/shortdata').then(res => {
      const { data } = res
      runInAction(() => {
        const a: TLanesInfo = data.map(serverData => {
          return {
            id: serverData.id,
            name: serverData?.name ?? 'noname',
            status: serverData?.state !== 'PPROGRESS',
            interval: serverData.intervals ?? [],
          }
        })
        this.lanesInfo = a
      })
    })
  }

  goToLane = (pageNumber: Extract<TNavigation, { title: 'Дорожка' }>['idLine']) => {
    runInAction(() => {
      // Изменияем страницу
      this.page = {
        pageTag: 'lane',
        title: 'Дорожка',
        idLine: pageNumber,
      }
      // Делаем дефолтные настройки страницы
      this.laneInfo = {
        id: pageNumber,
        intervals: [],
        isRunning: false,
        isLoading: true,
      }
    })
    setTimeout(() => (this.laneInfo.isLoading = false), 1000)
  }

  getTemplates = async () => {
    // eslint-disable-next-line new-cap
    await TIMEOUT(3000)
    axios
      .get<TInterval[]>('/task_templates.json')
      .then(data => {
        console.log(data)
        this.laneInfo.intervals = data.data
      })
      .finally(() => (this.laneInfo.isLoading = false))
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
      // console.log(`${event.name} with args: ${JSON.stringify(event.arguments)}`)
    }
  })
}
