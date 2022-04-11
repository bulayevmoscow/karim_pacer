import { TRequests, TTrack, TLane, TInterval } from '@monorepo/types'

const appData: { tracks: TTrack[] } = {
  tracks: [
    {
      id: 0,
      name: 'Дорожка 0',
      status: 'PROGRESS',
      progress: 0,
      connected: true,
      intervals: [
        {
          id: 0,
          speed: 90,
          distance: 500,
          rest: 20,
          repeat: 2,
          temp: 400,
          progress: 20,
        },
        {
          id: 1,
          speed: 90,
          distance: 500,
          rest: 20,
          repeat: 2,
          temp: 400,
          progress: 0,
        },
        {
          id: 2,
          speed: 90,
          distance: 500,
          rest: 20,
          repeat: 2,
          temp: 400,
          progress: 0,
        },
      ],
    },
    {
      id: 1,
      name: 'Дорожка 1',
      status: 'DISCONNECT',
      progress: 0,
      connected: true,
      intervals: [],
    },
    {
      id: 2,
      name: 'Дорожка 2',
      status: 'IDLE',
      progress: 0,
      connected: true,
      intervals: [],
    },
  ],
}

const DEF = {
  stepUpdate: 13,
} as const

class DataStorage {
  private tracks: TTrack[]
  private interval: NodeJS.Timer

  constructor() {
    this.tracks = appData.tracks
    this.interval = setInterval(this.updateProgress, 1000)
  }

  updateProgress = () => {
    this.tracks.forEach((track, index) => {
      if (track.status === 'PROGRESS') {
        track.progress += DEF.stepUpdate
        if (track.progress > 100) {
          track.progress -= 100
        }
        // console.log(`${index} track was updated! \t ${track.progress}`)
      }
    })
  }

  getShortData = (): TTrack[] => {
    return this.tracks.map(value => ({ ...value, intervals: value.intervals[0] ? [value.intervals[0]] : [] }))
  }

  getTrackData = (id: number): Extract<TRequests, { url: 'api/trackData' }>['res'] => {
    const res = this.tracks.filter(value => value.id === id)
    if (res.length === 0) {
      throw new Error('No Track')
    }
    if (res[0]) {
      return res[0]
    } else {
      return
    }
  }

  switchTrackStatus = (id: number, status: TTrack['status']) => {
    if (this.tracks[id].status === status) {
      throw new Error('SwitchTrackStatus --- Equal')
    }
    try {
      this.tracks[id].status = status
    } catch (e) {
      console.error('SwitchTrackStatus Error Write', e)
    }
  }

  addInterval = ({ track_id, interval }: Extract<TRequests, { url: '/api/addInterval' }>['payload']) => {
    const id = this.tracks[track_id].intervals.reduce((acc, interval) => {
      return acc > interval.id ? acc : interval.id
    }, -1)
    this.tracks[track_id].intervals = [...this.tracks[track_id].intervals, { ...interval, id: id + 1, progress: 0 }]
    console.log(this.tracks[track_id].intervals)
  }

  deleteInterval = ({ track_id, id }: Extract<TRequests, { url: '/api/delInterval' }>['payload']) => {
    let isFind = false
    this.tracks[track_id].intervals = this.tracks[track_id].intervals.filter(interval => {
      if (interval.id === id) {
        isFind = true
        return false
      } else {
        return true
      }
    })

    if (!isFind) {
      throw new Error(`No id find on ${track_id} track, interval id = ${id}`)
    }
  }
}
export default new DataStorage()

const shortData: TTrack[] = [
  {
    progress: 70,
    connected: true,
    id: 0,
    status: 'PROGRESS',
    name: 'Дорожка 1',
    intervals: [
      {
        progress: 0,
        speed: 90,
        distance: 200,
        rest: 20,
        repeat: 4,
        temp: 400,
        id: 1,
      },
    ],
  },
  {
    progress: 0,
    connected: true,
    id: 1,
    status: 'DISCONNECT',
    name: 'Дорожка 2',
    intervals: [],
  },
  {
    progress: 0,
    connected: false,
    id: 2,
    status: 'DISCONNECT',
    name: 'Дорожка 3',
    intervals: [],
  },
]

const trackDataEmpty: TTrack = {
  id: 1,
  name: 'Дорожка 2',
  status: 'IDLE',
  connected: true,
  progress: 0,
  intervals: [],
}
const trackDataOne: TTrack = {
  id: 1,
  name: 'Дорожка 2',
  status: 'IDLE',
  connected: true,
  progress: 0,
  intervals: [
    {
      id: 0,
      speed: 90,
      distance: 500,
      rest: 20,
      repeat: 2,
      temp: 400,
      progress: 0,
    },
  ],
}
