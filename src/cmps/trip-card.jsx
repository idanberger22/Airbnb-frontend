import { useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { ConfirmedResModal } from "./confirmed-res-modal";
import { ConfirmedResModalTrips } from "./confirmed-res-modal-trips";

export const TripCard = ({ trip }) => {

    const [resModalIsOpen, setResModalIsOpen] = useState(false)



    const toggleModalIsOpen = () => {

        setResModalIsOpen(!resModalIsOpen)
    }

    console.log(trip)

    return <section className="trip-card-container">
        {resModalIsOpen && <ConfirmedResModalTrips toggleModalIsOpen={toggleModalIsOpen} reservation={trip} />}
        <section className="trip-card">
            <div onClick={toggleModalIsOpen} className="clickable">
                <img src={trip.stay.img}></img>
            </div>

            <div className="trip-text">
                <p style={{textDecoration:'underline'}}>{trip.stay.name} by {trip.hostName}</p>
                <p>Address : {trip.stay.address.street},{trip.stay.address.country}</p>
                <p>Check in: {trip.checkIn.substring(0, 10)}</p>
                <p>Check out : {trip.checkOut.substring(0, 10)}</p>
                <p>Adults : {trip.adults}</p>
                <p>Children: {trip.childrens}</p>
                <p>Total price : ${utilService.getUsPrice(trip.totalPrice)}</p>
            </div>
        </section>
    </section>
}
