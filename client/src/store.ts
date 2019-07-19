import { createStore } from 'redux'

import reducer from './reducer'

export default function configureStore () {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default)
    })
  }

  return store
}
