import style from './TabHeaderStyle.module.pcss'
import { useContext } from 'react'
import { MyContext } from '@context'

export const TabHeader = () => {
  const { state, dispatch } = useContext(MyContext)
  const activeTab = state.appInfo.tab

  const getClassName = (tabNumber: number) => {
    const tab = state.pathInfo[tabNumber]
    if (!tab.connected) {
      return `${style.nav_item} ${style.brown_lamp}`
    }

    return tab.status === 'PROGRESS'
      ? `${style.nav_item} ${style.green_lamp}`
      : `${style.nav_item} ${style.yellow_lamp}`
  }

  const tabs: {
    current: boolean
    id: 0 | 1 | 2 | 3
    cn: string
    status: boolean
  }[] = [
    {
      id: 0,
      cn: getClassName(0),
      status: false,
      current: false,
    },
    {
      id: 1,
      cn: getClassName(1),
      status: false,
      current: false,
    },
    {
      id: 2,
      cn: getClassName(2),
      status: false,
      current: false,
    },
    {
      id: 3,
      cn: `${style.nav_item} ${style.setting}`,
      status: false,
      current: false,
    },
  ]

  tabs.forEach(tab => {
    tab.current = tab.id === activeTab
  })

  return (
    <div className={style.nav_container}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${tab.cn} ${tab.current && style.active}`}
          onClick={() => {
            dispatch({ type: 'changePage', page: tab.id })
          }}
        />
      ))}
    </div>
  )
}
