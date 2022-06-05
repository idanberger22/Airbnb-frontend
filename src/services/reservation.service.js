import { ReservationConfirmed } from '../store/actions/reservation.action.js';
import { store } from '../store/index.js';
import { showSuccessMsg } from './event-bus.service.js';
import { httpService } from './http.service.js'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';

export const reservationService = {
    query,
    addReservation,
    removeReservation
}
window.cs = reservationService;
const reviewChannel = new BroadcastChannel('reservationChannel')

;(() => {
    reviewChannel.addEventListener('message', (ev) => {
      store.dispatch(ev.data)
    })
    socketService.on(SOCKET_EVENT_REVIEW_ADDED, () => {
        // alert('you got a new reservation fron guest')
      console.log('GOT from socket' )
    //   store.dispatch(ReservationConfirmed(review))
    showSuccessMsg(`New reservation added`)
    })
    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })
  })()


  




async function query(Id) {
    let reservations = await httpService.get('reservation', Id)
    return reservations
}

async function addReservation(reservation) {
    const addedReservation = await httpService.post('reservation', reservation)
    // review.byUser = userService.getLoggedinUser()
    // review.aboutUser = await userService.getById(review.aboutUserId)
    // const addedReview = await storageService.post('review', review)

    // reviewChannel.postMessage(ReservationConfirmed(addedReservation))
    return addedReservation
}

async function removeReservation(reservation) {
    const deletedReservation = await httpService.delete('reservation', reservation)
    return deletedReservation
}


