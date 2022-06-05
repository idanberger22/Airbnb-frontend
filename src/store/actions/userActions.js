import { userService } from '../../services/user.service'

export function signup(user) {
    return async (dispatch) => {
        const newUser = await userService.signup(user)
        dispatch({ type: 'LOGIN', user:newUser })
    }
}

export function login(credentials) {
    return async (dispatch) => {
        const user = await userService.login(credentials)
        dispatch({ type: 'LOGIN', user })
    }
}

export function logOut() {
    return async (dispatch) => {
        await userService.logout()
        dispatch({ type: 'LOGOUT' })
    }
}

export function loadUsers() {
    return (dispatch) => {
        const users = userService.query()
        dispatch({ type: 'LOAD_USERS', users })
    }
}
export function removeUser(id) {
    return (dispatch) => {
        userService.removeUser(id)
        dispatch({ type: 'DELETE_USER', id })
    }
}

export function openModal(isLogin) {
    return (dispatch) => {
        dispatch({ type: 'OPEN_MODAL', isLogin })
    }
}

export function closeModal() {
    return (dispatch) => {
        dispatch({ type: 'CLOSE_MODAL' })
    }
}
