import { utilService } from "../services/util.service"
// import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"

export function StayPreview({ stay }) {
    const [imgIdx, setImgIdx] = useState(null)
    const [heartClass, setHeartClass] = useState('')

    useEffect(() => {
        const imgIdx = 0
        setImgIdx(imgIdx)
    }, [])

    var dif = 0
    const switchImg = (event, direction) => {
        event.preventDefault()
        event.stopPropagation();

        { var len = stay.imgUrls.length }
        (direction === 'up') ? dif = 1 : dif = -1
        const idx = imgIdx + dif
        { if (idx === len) idx = len }
        { if (idx < 0) idx = 0 }
        setImgIdx(idx)
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
                        <img src={stay.imgUrls[imgIdx]}></img>
                        <div onClick={(event) => switchImg(event, 'up')} className="arr right-arr">
                            <span className="material-icons">arrow_forward_ios</span>
                        </div>
                        <div onClick={(event) => switchImg(event, 'down')} className="arr left-arr">
                            <span className="material-icons">arrow_back_ios</span>
                        </div>
                    </div>
                </div>
                {/* <img src='https://res.cloudinary.com/dhy6ndeij/image/upload/v1653480425/001_urftcv.jpg'></img> */}
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
        </Link>
    )

}

