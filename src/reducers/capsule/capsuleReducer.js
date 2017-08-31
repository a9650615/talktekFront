import {
  SET_CAPSULE_INFO
} from './capsuleTypes'

const initState = {
  audioName: '',
  draft: '',
  id: '',
  likeCounter: '',
  url: ''
}

export default function capsuleReducer(state, action) {
  switch(action.type) {
    case SET_CAPSULE_INFO:
      return Object.assign({}, state, action.payload)
    default:
      return state || initState
  }
}

//export default function capsule(state = {}, action) {
//  console.log(action)
//  return {
//    capsule: capsuleReducer(state.capsule, action)
//  }
//}