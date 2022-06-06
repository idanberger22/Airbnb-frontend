import { utilService } from "../services/util.service"
import { reservationService } from "../services/reservation.service"
import { userService } from "../services/user.service"
import { ConfirmedResModalTrips } from "./confirmed-res-modal-trips"

export function ReservationPreview2({ reservation, getReservations }) {

    // var date = reservation.checkIn

    const onRemove = async () => {
        const deletedRes = await reservationService.removeReservation(reservation)
        getReservations()
    }

    const openModal = () => {

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
                {/* <td>2</td> */}
            {/* {reservation.adults + reservation.childrens} */}
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

