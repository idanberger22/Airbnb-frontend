
import { useEffect, useState } from "react"
import { ReservationPreview2 } from "../cmps/reservation2-preview"
import { reservationService } from "../services/reservation.service"
import { userService } from "../services/user.service"


export const Host = () => {

    const [reservations, setreservations] = useState(null)




    useEffect(() => {
        getReservations()
    }, [])

    let loggedinUser = userService.getLoggedinUser()
    const getReservations = async () => {
        const reservatios = await reservationService.query({hostId:loggedinUser._id})
        const sortedReservatios = reservatios.sort((a,b) => Date.parse(a.checkIn) - Date.parse(b.checkIn))
        setreservations(sortedReservatios)
        // {hostId:loggedinUser._id}

    }






    { if (!reservations) return <h1>loading</h1> }

    return (<div className="stock-margin main-host-page">
        <div className="stock-margin-center">
            <div className="flex">
                <li>
                    <img src={loggedinUser.imgUrl} alt="" />
                </li>
                <li>
                    <h1>
                        Hello {loggedinUser.fullName}!
                    </h1>
                </li>
            </div>
            <div className="header">
          
                    
            </div>
            <div>
                    <div className="reservations-container">
                <table className="reservations-table" >

                    <tr>
                    <th>Guest Name</th>
                    <th>Property</th>
                    <th>Guests qty</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Total price</th>
                    <th>Add a review</th>
                    <th>Cancel</th>
                    </tr>

                    {reservations.map(reservation =>
                    <tr>

                        <ReservationPreview2 getReservations={getReservations}   reservation={reservation} key={reservation._id} />
                    </tr>
                    )}
                </table>
                    </div>
            </div>
        </div>
    </div>
    )
}


