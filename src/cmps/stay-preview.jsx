import { utilService } from "../services/util.service"
import { Link } from 'react-router-dom'
import { useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

export function StayPreview({ stay }) {
    const [heartClass, setHeartClass] = useState('')

    const switchImg = (event) => {
        if (event.target.className.includes('control-arrow') || event.target.className.includes('dot')) {
            event.preventDefault()
            event.stopPropagation();
        }
    }

    const changeHeartColor = (event) => {
        event.preventDefault()
        setHeartClass((heartClass === '') ? 'red' : '')
    }

    return (
        <Link to={`/stay/${stay._id}`}>
            <div className="stay-card">
                <div>
                    <div className="img-container">
                        <div className={`heart ${heartClass}`} onClick={changeHeartColor}>
                            <span className="material-icons">favorite</span>
                        </div>
                        <div onClick={(ev) => switchImg(ev)}>
                            <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
                                {stay.imgUrls.map((img, index) => {
                                    return <div key={index}>
                                        <img src={img}></img>
                                    </div>
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="stay-preiview-details location-rate">
                    <li><h1 className="font-medium" >{stay.address.city}, {stay.address.country}</h1></li>
                    <li><h1 className="font-light">{utilService.make2digits(stay.reviewScores.value / 2)}

                    </h1>
                        <h1><span className="material-icons">star</span></h1></li>
                </div>
                <div className="stay-preiview-details propery-description">
                    <li><h1>{stay.name} </h1></li>
                </div>
                <div className="stay-preiview-details propery-price">
                    <li><h1 className="font-bold">${utilService.getUsPrice(stay.price)} <span className="font-light">night</span></h1></li>
                </div>
            </div>
        </Link >
    )
}

