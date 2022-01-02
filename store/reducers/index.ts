import { combineReducers } from 'redux'
import authReducer from './authReducer'
import playerReducer from './playerReducer'
import memberReducer from './memberReducer'

const reducers = combineReducers({
  authReducer,
  playerReducer,
  memberReducer,
})

export default reducers
