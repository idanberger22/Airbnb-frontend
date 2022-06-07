import { ReservationConfirmed } from '../store/actions/reservation.action.js';
import { store } from '../store/index.js';
import { showSuccessMsg } from './event-bus.service.js';
import { httpService } from './http.service.js'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';

export const reservationService = {
    query,
    addReservation,
    removeReservation
}


async function query(Id) {
    let reservations = await httpService.get('reservation', Id)
    return reservations
}

async function addReservation(reservation) {
    const addedReservation = await httpService.post('reservation', reservation)
    socketService.emit('new-reservation',{hostId:addedReservation.hostId,guestName:addedReservation.user.fullName})
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


