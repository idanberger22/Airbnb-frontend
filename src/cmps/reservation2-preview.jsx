import { utilService } from "../services/util.service"
import { reservationService } from "../services/reservation.service"
import { userService } from "../services/user.service"

export function ReservationPreview2({ reservation, getReservations }) {

    // var date = reservation.checkIn

    const onRemove = async () => {
        const deletedRes = await reservationService.removeReservation(reservation)
        getReservations()
    }

    return (<>
        <td style={{ textAlign: 'left' }}>
            <span style={{ marginLeft: '4px' }}>{reservation.user.fullName}</span>
        </td>
        <td style={{ textAlign: 'left' }}>
        <span style={{ marginLeft: '4px' }}>{reservation.stay.name}</span>
        </td>

        <td>
            {reservation.adults + reservation.childrens}
        </td>

        <td>
            {reservation.checkIn.substring(0, 10)}
        </td>

        <td>
            {reservation.checkOut.substring(0, 10)}
        </td>
        <td>
            {reservation.nights}
        </td>

        <td>
            ${utilService.getUsPrice(reservation.totalPrice)}
        </td>
        <td>
            <button className="clickable" onClick={onRemove}>Reject</button>
        </td>
    </>
    )

}

