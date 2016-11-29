import firebase from 'firebase'
import auth from './index'
import { Actions } from 'react-native-router-flux'

import network from '../network'

const login = () => {
  return dispatch => {
    return network.login()
  }
}

const logout = () => {
  return dispatch => {
    return network.logout()
  }
}

export {
  login,
  logout,
}
