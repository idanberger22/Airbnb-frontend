import { useEffect, useState } from "react"
import {React} from "react"

export const StayProperyDetail = ({ stay }) => {
    
    useEffect(() => {
    }, [])

    return <section className="features">
        <section>
            <h5>{stay.capacity} guest · {stay.bedrooms} bedrooms · {stay.beds} beds · {stay.bathrooms} baths </h5>
        </section>
        <div className="feature-block">
            <div className="feature-logo"><span className="material-icons">home</span></div>
            <section>
                <div><h4>Entire home</h4></div>
                <div><h5>You’ll have the apartment to yourself.</h5></div>
            </section>
        </div>
        <div className="feature-block">
            <div className="feature-logo"><span className="material-icons ">location_on</span></div>
            <section>
                <div><h4>Great location</h4></div>
                <div><h5>Recent guests gave the location a 5-star rating.</h5></div>
            </section>
        </div>
        <div className="feature-block">
            <div className="feature-logo"><span className="material-icons">auto_awesome</span></div>
            <section>
                <div><h4>Enhanced Clean</h4></div>
                <div><h5>This host has committed to our 5-step enhanced cleaning process.</h5></div>
            </section>
        </div>

        <div className="feature-block">
            <div className="feature-logo"><span className="material-icons">event</span></div>
            <section>
                <div><h4>Free cancellation up to 24 hours before check-in</h4></div>
                <div><h5>feel free to be flexible.</h5></div>
            </section>
        </div>
    </section>

}