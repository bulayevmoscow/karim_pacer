export type TNavigation =
  | {
      title: 'Дорожки'
      pageTag: 'main'
    }
  | {
      title: 'Дорожка'
      pageTag: 'lane'
      idLine: number
    }
  | {
      title: 'Настройки'
      pageTag: 'setting'
    }

export type TModalManager =
  | {}
  | {
      header: 'Ошибка подключения'
      type: 'ErrorConnect'
      code: number
      url: string
    }
