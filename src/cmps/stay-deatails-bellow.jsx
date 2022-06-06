import { useEffect, useRef, useState } from "react"
import { React } from "react"

export function StayDeatailsBellow({ stay }) {

    return (
        <section className="">
            <section className="stay-details-header-below">
                <div className="below-header">
                    <h1>{stay.roomType} Hosted by {stay.host.fullname} </h1>
                    <section>
                        <h5>{stay.capacity} guest · {stay.bedrooms} bedrooms · {stay.beds} beds · {stay.bathrooms} baths </h5>
                    </section>
                </div>
                <div>
                    <img src={stay.host.thumbnailUrl} />
                </div>
            </section>

            <section className="details-features">
                <div className="feature-block">
                    <div className="feature-logo"><span className="material-icons">home</span></div>
                    <section className="paragraph">
                        <div>
                            <h4>Designed by</h4>
                        </div>
                        <div className="feature-text">
                            <h5>Meredith Higgins & Bryant GingerichRenee Byler, Burrow Creative</h5>
                        </div>
                    </section>
                </div>
                <div className="feature-block">
                    <div className="feature-logo"><span className="material-icons ">location_on</span></div>
                    <section className="paragraph">
                        <div>
                            <h4>Self check-in</h4>
                        </div>
                        <div className="feature-text">
                            <h5>Check yourself in with the lockbox.</h5>
                        </div>
                    </section>
                </div>
                <div className="feature-block">
                    <div className="feature-logo"><span className="material-icons">auto_awesome</span></div>
                    <section className="paragraph">
                        <div><h4>Free cancellation for 48 hours.</h4></div></section>
                </div>
            </section>
            <div className="stay-cover">
                <h1 className="font-bolder"><span className="stay-cover-logo font-medium">stay</span>COVER</h1>
                <div className="stay-cover-text">
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies,
                        and  other issues like trouble checking in.</p>
                </div>
            </div>

            <div className="stay-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non unde totam nostrum error corporis quis velit dicta sapiente vitae ut, delectus repudiandae iste sit excepturi quidem nulla odit earum facere a aperiam voluptates blanditiis,<br /> pariatur in voluptatibus! Repellat placeat quam voluptate possimus qui, error earum! Aut asperiores fugiat illum rem omnis <br />qui nam aliquid, veniam saepe quaerat accusamus porro vero, tenetur quia repellat? Nihil blanditiis nulla architecto vero quaerat unde accusamus vitae. Voluptatibus laborum odio odit omnis repellendus? Dolore,<br /> commodi! Veritatis, provident. Quasi officia tempore, temporibus, magnam recusandae optio ullam accusantium provident placeat ea laboriosam aliquam inventore non minus culpa.
                <p className="stay-cover-more">Show more</p>
            </div>


            <div className="stay-amenities">
                <h2>What this place offers</h2>
                <ul className="amenities-list">
                    <li>
                        <div className="amenity-container">
                            <span className="material-icons"> live_tv </span>
                            <h5>TV</h5>
                        </div>
                    </li>
                    <li>
                        <div className="amenity-container">
                            <span className="material-icons">  restaurant  </span>
                            <h5>Kitchen</h5>
                        </div>
                    </li>
                    <li>
                        <div className="amenity-container">
                            <span className="material-icons">  pets  </span>
                            <h5>Pets Allowed</h5>
                        </div>
                    </li>
                    <li>
                        <div className="amenity-container">
                            <span className="material-icons">  wifi  </span>
                            <h5>Wifi</h5>
                        </div>
                    </li>
                    <li>
                        <div className="amenity-container">
                            <span className="material-icons">   ac_unit   </span>
                            <h5>Air conditioning</h5>
                        </div>
                    </li>
                    <li>
                        <div className="amenity-container">
                            <span className="material-icons">    smoking_rooms    </span>
                            <h5>Smoking Allowed</h5>
                        </div>
                    </li>
                </ul>
            </div>

        </section>

    )
}