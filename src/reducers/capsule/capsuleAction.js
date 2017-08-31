import {
  SET_CAPSULE_INFO
} from './capsuleTypes.js'

function setCapsuleInfo (data) {
  return {
    type: SET_CAPSULE_INFO,
    payload: data
  }
}

export default {
  setCapsuleInfo
}
