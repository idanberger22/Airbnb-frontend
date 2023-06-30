import { useState } from "react"
import { ConfirmedResModalTrips } from "./confirmed-res-modal-trips"

export const TripCard = ({ trip }) => {

    const [resModalIsOpen, setResModalIsOpen] = useState (false)
    const toggleModalIsOpen = () => {
        
        setResModalIsOpen(!resModalIsOpen)
    }
 
    return <section  className="trip-card-container">
        {resModalIsOpen && <ConfirmedResModalTrips  toggleModalIsOpen={toggleModalIsOpen} reservation={trip}/>}
        <section className="trip-card">
            <div onClick={toggleModalIsOpen} className="clickable">
                <img src={trip.stay.img}></img>
            </div>
            <div className="trip-card-text">
                <div>

                    <div className="trip-card-name">
                        {trip.stay.address.country}
                    </div>
                    <div>
                        Hosted by {trip.hostName}
                    </div>
                    <div>
                        {trip.checkIn.substring(0, 10)} - {trip.checkOut.substring(0, 10)}
                    </div>
                </div>
            </div>
        </section>
    </section>
}
