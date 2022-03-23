import { TRequests, TTrack, TLane } from '@monorepo/types'

export const appData: { tracks: TTrack[] } = {
  tracks: [
    {
      id: 0,
      name: 'Дорожка 0',
      status: 'PROGRESS',
      progress: 0,
      connected: true,
      intervals:
        [
          {
            id: 0,
            speed: 90,
            distance: 500,
            rest: 20,
            repeat: 2,
            temp: 400,
            progress: 0,
          },
        ] || [],
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

export const shortData: TTrack[] = [
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

export const trackDataEmpty: TTrack = {
  id: 1,
  name: 'Дорожка 2',
  status: 'IDLE',
  connected: true,
  progress: 0,
  intervals: [],
}
export const trackDataOne: TTrack = {
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
