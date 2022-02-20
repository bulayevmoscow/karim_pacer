import { TRequests, TTrack } from '@monorepo/types'

export const appData: { tracks: TTrack[] } = {
  tracks: [
    {
      id: 0,
      name: 'Дорожка 0',
      status: true,
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
      status: true,
      progress: 0,
      connected: true,
      intervals: [],
    },
    {
      id: 2,
      name: 'Дорожка 2',
      status: true,
      progress: 0,
      connected: true,
      intervals: [],
    },
  ],
}

export const trackData: { track: TTrack } = {
  track: {
    id: 0,
    name: 'Дорожка 0',
    status: true,
    progress: 70,
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
        progress: 20,
      },
      {
        id: 2,
        speed: 90,
        distance: 500,
        rest: 20,
        repeat: 2,
        temp: 400,
        progress: 20,
      },
    ],
  },
}
