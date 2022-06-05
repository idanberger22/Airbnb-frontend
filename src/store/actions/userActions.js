import {userService} from '../../services/user.service'

export function login(credentials) {
    return (dispatch) => {
      return userService.login(credentials)
      .then((user) => {
        dispatch({ type: 'LOGIN', user })
      })
    } 
  }

export function loadUsers() {
    return (dispatch) => {
        const users=userService.query()
        dispatch({ type: 'LOAD_USERS', users })
    }
}
export function removeUser(id) {
    return (dispatch) => {
        userService.removeUser(id)
        dispatch({ type: 'DELETE_USER', id })
    }
}
export function addUser(user) {
    return (dispatch) => {
        const added=userService.saveUser(user)
        dispatch({ type: 'ADD_USER', user:added })
    }
}

export function openModal(isLogin){
    return (dispatch) => {
        dispatch({ type: 'OPEN_MODAL', isLogin })
    }
}

export function closeModal(){
    return (dispatch) => {
        dispatch({ type: 'CLOSE_MODAL'})
    }
}
