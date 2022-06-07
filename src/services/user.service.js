import { httpService } from './http.service'
import { socketService } from './socket.service'
const AUTH_KEY = 'auth/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
}

window.userService = userService

async function login(userCred) {
    const user = await httpService.post(AUTH_KEY+'login', userCred)
    console.log('user',user)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
    else console.log('user not found')
}
async function signup(user) {
    const newUser = await httpService.post(AUTH_KEY+'signup', user)
    socketService.login(newUser._id)
    return saveLocalUser(newUser)
}
async function logout() {
    const isOut = await httpService.post(AUTH_KEY+'logout')
    if (isOut) {
        localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        socketService.logout()
    }
    else console.log('how can one fail to logout??')
}

function saveLocalUser(user) {
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}






