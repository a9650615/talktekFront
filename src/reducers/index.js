import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import capsule from './capsule/capsuleReducer'

export default combineReducers({
  capsule,
  routing: routerReducer
})
