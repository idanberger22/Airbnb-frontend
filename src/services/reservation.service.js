import { httpService } from './http.service.js'

export const reservationService = {
    query,
    addReservation,
    removeReservation
}
window.cs = reservationService;

async function query(ev,Id) {
    let reservations = await httpService.get('reservation',Id)
    
    return reservations
}

async function addReservation(reservation) {
    const addReservation = await httpService.post('reservation', reservation)
    return addReservation
}

async function removeReservation(Id) {
    const deletedReservation = await httpService.delete('reservation', Id)
    return deletedReservation
}


