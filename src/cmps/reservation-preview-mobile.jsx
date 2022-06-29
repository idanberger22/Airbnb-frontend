import { utilService } from "../services/util.service"
import { reservationService } from "../services/reservation.service"

export function ReservationPreviewMobile({ reservation, getReservations }) {

    const onRemove = async () => {
        await reservationService.removeReservation(reservation)
        getReservations()
    }

    return (<div className="reseravtion-preview-mobile">
        <h1>confirmed · {reservation.user.fullName}</h1>
        <p>{reservation.stay.name}</p>
        <p>{reservation.checkIn.substring(0, 10)} to {reservation.checkOut.substring(0, 10)}</p>
        <p>{reservation.adults} adults · {reservation.nights} nights g· ${utilService.getUsPrice(reservation.totalPrice)}</p>
        <button className="clickable" onClick={onRemove}>Reject</button>
    </div>
    )

}
