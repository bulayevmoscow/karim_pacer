import { observer } from 'mobx-react-lite'
import { Footer } from '@modules/components/footer/Footer'
import { Tracks } from '@modules/components/tracks/Tracks'
import { Header } from '@modules/components/header/Header'
import style from './index.module.scss'
import store from '@store'

export const Index = observer(() => {
  const { page } = store
  return (
    <div className={style.app_container}>
      <Header />
      {page?.pageTag === 'main' && <Tracks />}
      <Footer />
    </div>
  )
})
