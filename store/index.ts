import { createStore, applyMiddleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production')
    return composeWithDevTools(applyMiddleware(...middleware))

  return applyMiddleware(...middleware)
}

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE)
    return {
      ...state,
      ...action.payload,
    }

  return reducers(state, action)
}

const initStore = createStore(reducer, bindMiddleware([thunk]))

const currentStore = () => {
  return initStore
}

const store = createWrapper(currentStore)

export default store
