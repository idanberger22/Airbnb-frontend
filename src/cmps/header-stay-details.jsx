import {React} from "react"
import { useEffect, useState } from "react"

export const HeaderStayDeatails = ({ stay }) => {

    return <section className="details-header">
    <div className="decription-stay-priview">
        <h2>{stay.name}</h2>
    </div>
    <section className="secondary-header-stay-details">
        <div className="left-side">
            <li>
                <h4><span className="material-icons">star</span>{stay.reviewScores.value / 2}</h4>
            </li>
            <h1>·</h1>
            <li>
                <h4>({stay.reviews.length} reviews)</h4>
            </li>
            <h1>·</h1>
            <li>
                <h4>{stay.address.street}</h4>
            </li>
        </div>

        <div className="right-side">

            <section className="flex">
                <h4><span className="material-icons">ios_share</span>Share</h4>
                <h4><span className="material-icons">favorite</span>Save</h4>
            </section>
        </div>


    </section>
</section>

}