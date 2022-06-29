import { utilService } from "../services/util.service"
import { reservationService } from "../services/reservation.service"

export function ReservationPreviewMobile({ reservation, getReservations }) {

    const onRemove = async () => {
        await reservationService.removeReservation(reservation)
        getReservations()
    }

    return (<div className="reseravtion-preview-mobile">

        {reservation.stay.name}

        {reservation.user.fullName}

        {reservation.adults}

        {reservation.childrens}

        {reservation.checkIn.substring(0, 10)}

        {reservation.checkOut.substring(0, 10)}

        {reservation.nights}

        ${utilService.getUsPrice(reservation.totalPrice)}

        <button className="clickable" onClick={onRemove}>Reject</button>

    </div>
    )

}
