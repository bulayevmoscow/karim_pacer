import { makeAutoObservable } from 'mobx'

class TodoStore {
  tick = 5
  name: string = 'keeeeku'
  that = this

  get getTickList() {
    return 'Total: ' + this.tick
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  clearName() {
    console.log(this)
    this.name = ''
  }

  incrTick = () => {
    this.tick++
  }

  arrow = () => {
    console.log(this)
  }

  noarrow() {
    console.log(this)
  }
}

export default new TodoStore()
