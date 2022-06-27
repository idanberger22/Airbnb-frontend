import { utilService } from "../services/util.service"
import { reservationService } from "../services/reservation.service"

export function ReservationPreview({ reservation, getReservations }) {

    const onRemove = async () => {
        await reservationService.removeReservation(reservation)
        getReservations()
    }

    return (<>
       
       
        <td style={{ textAlign: 'left' }}>
            <span style={{ marginLeft: '4px' }}>{reservation.stay.name}</span>
        </td>

        <td className="guests">
            <tr>
                <td>{reservation.user.fullName}</td>
            </tr>
            {reservation.adults!=0 && <tr>
                <td>Adults: {reservation.adults}</td>
            </tr>}
            {reservation.childrens!=0 &&  <tr>
                <td>Children: {reservation.childrens}</td>
            </tr>}
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

