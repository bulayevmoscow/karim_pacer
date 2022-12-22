import { TSetting } from '@monorepo/front/src/modules/components/settings/types'

let SettingsData: TSetting = {
  color: {
    pace: '#FFFFFF',
    wait: '#FF5858',
    delay: '#43FF01',
  },
  delay: 2,
  pool: {
    type: 0,
    L: 25.0,
    L1: 5.6,
    L2: 15.0,
    L3: 4.0,
    H1: 1.8,
    H2: 6.0,
  },
}

export const getSettigs = () => {
  return SettingsData
}

export const postSettigs = (newData: TSetting) => {
  SettingsData = newData
  return SettingsData
}
