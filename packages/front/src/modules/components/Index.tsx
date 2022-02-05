import store from '@store'
import { observer } from 'mobx-react-lite'
import makeInspectable from 'mobx-devtools-mst'
import { Footer } from '@modules/components/footer/Footer'

if (import.meta.env.MODE === 'development') {
  makeInspectable(store)
}

export const Index = observer(() => {
  return (
    <>
      <Footer />
    </>
  )
})
