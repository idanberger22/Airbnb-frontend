import { utilService } from "../services/util.service"
// import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"
import { reservationService } from "../services/reservation.service"
import { userService } from "../services/user.service"

export function ReservationPreview2({ reservation, getReservations }) {

    // var date = reservation.checkIn

    const onRemove = async () => {
        let loggedinUser = userService.getLoggedinUser()

        const deletedRes = await reservationService.removeReservation(reservation)
        if(deletedRes) console.log('reservation has been deleted: ', reservation)
        if(deletedRes) console.log('loggedinUser: ',loggedinUser)
        else console.log('couldnt delete a reservation')
        getReservations()
    }


    return (<>
        
                    
                    <td>{reservation.user.username}</td>
                   
                    <td style={{ textAlign: 'left'}}>
                        {reservation.stay.name}
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
                        ${reservation.totalPrice}
                    </td>
                    <td>
                        <button>Add a review</button>
                    </td>
                    <td>
                        <button onClick={onRemove}>Cancel</button>
                    </td>
                   
               

    </>
    )

}

