import { Provider } from 'react-redux'
import {useStore} from '../redux/store'
import '../styles/globals.css'
// import type { AppProps /*, AppContext */ } from 'next/app'

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App