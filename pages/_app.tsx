import { Provider } from 'react-redux'
import {useStore} from '../redux/store'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ReactElement} from 'react'

function App({ Component, pageProps }: AppProps): ReactElement {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App