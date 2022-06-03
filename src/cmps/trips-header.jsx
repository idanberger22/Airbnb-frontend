import { NavLink } from "react-router-dom"
import {useState } from "react"



export const TripsHeader = () => {

    const [headerImg, setHeaderImg] = useState("../assets/imgs/trips.jpg")

    return (
        <section className="trips-header">
            <section>
                <h2>Trips</h2>
            </section>
            <section className="trips-search-card">
                <h3>No trips booked...yet!</h3>
                <h6>time to dust off your bags and start planning your next adventure</h6>
                <NavLink to='/explore' ><div className="search-button">Start searching</div></NavLink>
            </section>
            <div>
                {/* <img src={headerImg}/> */}
            </div>
        </section>
    )

}