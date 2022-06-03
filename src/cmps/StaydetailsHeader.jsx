import { useEffect, useRef, useState } from "react"
import { React } from "react"

export function StaydetailsHeader({ stay }) {
   
    return (<section className="details-header">
        <div className="decription-stay-priview">
            <h2>{stay.name}</h2>
        </div>
        <section className="secondary-header-stay-details">
            <div className="left-side">
                <li>
                    <h4><span className="material-icons">star</span></h4>
                </li>
                <li>
                    <h4>{stay.reviewScores.value / 2}</h4>
                </li>
                <li>
                    <h4>·</h4>
                </li>
                <li className="header-stay-details-reviews">
                    <h4>{stay.reviews.length} reviews</h4>
                </li>
                <li>
                    <h1>·</h1>
                </li>
                <li className="header-stay-details-address">
                    <h4>{stay.address.street}</h4>
                </li>
            </div>
            <div className="right-side">
                <li>
                    <h4><span className="material-icons">ios_share</span></h4>
                </li>
                <li className="right-side-share">
                    <h4>Share</h4>
                </li>
                <li>
                    <h4><span className="material-icons">favorite</span></h4>
                </li>
                <li>
                    <h4>Save</h4>
                </li>

            </div>


        </section>
    </section>

    )
}