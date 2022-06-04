import { useEffect, useRef, useState } from "react"
import { TripCard } from "../cmps/trip-card"
import { TripsHeader } from "../cmps/trips-header"
import { reservationService } from "../services/reservation.service"
import { tripsService } from "../services/trips.service"
import { userService } from "../services/user.service"




export const Trips = () => {
    let loggedinUser = userService.getLoggedinUser()

    const [trips, setTrips] = useState(null)
    useEffect(() => {
        getTrips(loggedinUser)
    },[])
    
    const getTrips = async (loggedinUser) => {
        const trips = await reservationService.query({userId: loggedinUser._id})
        const sortedTrips = trips.sort((a,b) => Date.parse(a.checkIn) - Date.parse(b.checkIn))
        setTrips(sortedTrips)
    }
    if(!trips) return <h1>Loding...</h1>
    return (
        <section className="trips stock-margin">
            <div className="stock-margin-center">
            <div className="flex">
                <li>
                    <img className="user-name-img" src={loggedinUser.imgUrl} alt="" />
                </li>
                <li>
                    <h1>
                        Hello {loggedinUser.fullName}!
                    </h1>
                </li>
            </div>
            {/* <div>
                <TripsHeader />
            </div> */}
                <div className="trip-card-header "><h3>Your trips:</h3></div>
            <section className="trip-cards-container ">
                {trips.map(trip => <TripCard trip={trip} key={trip._id} />)}
            </section>
            </div>
                
        </section>
    );

}


