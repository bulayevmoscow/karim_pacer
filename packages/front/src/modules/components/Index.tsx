import { observer } from 'mobx-react-lite'
import { Footer } from '@modules/components/footer/Footer'
import { Tracks } from '@modules/components/tracks/Tracks'
import { Header } from '@modules/components/header/Header'
import style from './index.module.scss'
import store from '@store'
import { Lane } from '@modules/components/lane/Lane'
import { Settings } from '@modules/components/settings/Settings'
import { useEffect } from 'react'

export const Index = observer(() => {
  const { page } = store
  useEffect(() => {
    store.getShortData()
  })
  return (
    <div className={style.app_container}>
      <Header />
      {page?.pageTag === 'main' && <Tracks />}
      {page?.pageTag === 'lane' && <Lane />}
      {page?.pageTag === 'setting' && <Settings />}
      <Footer />
    </div>
  )
})
