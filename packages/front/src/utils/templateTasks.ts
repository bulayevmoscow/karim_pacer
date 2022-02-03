import { TTask } from '@monorepo/types'

const storageItems = {
  default: 'default-template',
} as const

const TemplateTasks: Omit<TTask, 'active'>[] = [
  {
    name: 'Интвервал 1',
    speed: 90,
    distance: 200,
    rest: 20,
    temp: 400,
    repeat: 10,
  },
]

export const setTemplateTasks = () => {
  if (window.localStorage.getItem(storageItems.default) === null) {
    console.log('123')
    window.localStorage.setItem(storageItems.default, JSON.stringify(TemplateTasks))
  }
}
