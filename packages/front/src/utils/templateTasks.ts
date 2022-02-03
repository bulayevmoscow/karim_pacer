type TTemplate = {
  speed: number
  distance: number
  rest: number
  temp: number
  repeat: number
}

const storageItems = {
  default: 'default-template',
} as const

const TemplateTasks: TTemplate[] = [
  {
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
