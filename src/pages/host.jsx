
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from "../store/actions/userActions"
import { ReservationPreview2 } from "../cmps/reservation2-preview"
import { UploadStay } from "../cmps/upload-stay"
import { reservationService } from "../services/reservation.service"
import { stayService } from "../services/stay.service"
import { StayPreview } from "../cmps/stay-preview"
import { NavLink } from "react-router-dom"
import { utilService } from "../services/util.service"

export const Host = () => {

    const [reservations, setreservations] = useState(null)
    const [uploadStyling, setUploadStyling] = useState(false)
    const [hostStyling, setHostStyling] = useState(true)
    const [listingsDetailsStyling, setListingsDetailsStyling] = useState(true)
    const loggedInUser = useSelector((storeState) => storeState.userModule.loggedinUser)
    const [hostStays, setHostStays] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        document.documentElement.style.setProperty('--headerFontColor', '#000');
        document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
        if (!loggedInUser) {
            dispatch(openModal(true))
        }
        else {
            getReservations()
            getStays()
        }
    }, [loggedInUser])

    useEffect(() => {
        getReservations()
        if (hostStays.length > 0) {
            setHostStyling(true)
            setListingsDetailsStyling(true)
        }
    }, [hostStays])

    const getStays = async () => {
        const stays = await stayService.getByHOstId(loggedInUser._id)
        if (stays.length === 0) {
            setHostStyling(false)
            setListingsDetailsStyling(false)
        }
        else {
            setHostStyling(true)
        }
        setHostStays(stays)
    }
    const showUploadStayTogle = () => {
        setUploadStyling(!uploadStyling)
    }

    const closeMainCover = () => {
        setHostStyling(true)

    }

    const getIncome = ()=>{
        if(!reservations) return 0
        let totalIncome = 0
        reservations.forEach(res => totalIncome+=res.totalPrice)
        return totalIncome
    }

    const getReservations = async () => {
        const reservatios = await reservationService.query({ hostId: loggedInUser._id })
        const sortedReservatios = reservatios.sort((a, b) => Date.parse(a.checkIn) - Date.parse(b.checkIn))
        setreservations(sortedReservatios)
    }
    if (!loggedInUser) return <h1>must be logged in</h1>
    if (!reservations) return <h1>you currently have no reservations</h1>
    if (!hostStays) return <h1>loading</h1>


    return (
        <div className="stock-margin main-host-page">
            {!hostStyling && <div className="become-a-host">
                <div className="left-side">
                    <div className="logo-become-a-host">
                        <NavLink className='clickable' to='/home'>
                            <img className="host-img" src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654456715/logo-white_yk9z30.png" alt="" />
                        </NavLink>
                    </div>
                    <div className="container">
                        <h1>Open your door to hosting</h1>
                        <button className="reserve-button" onClick={closeMainCover}>Try hosting</button>
                    </div>
                </div>
                <div className="right-side"></div>
            </div>}

            {hostStyling && <div className="stock-margin-center">
                <div className="flex">
                    <li>
                        <img src={loggedInUser.imgUrl} alt="" />
                    </li>
                    <li>
                        <h1>
                            Hello {utilService.capitalizeFirst(loggedInUser.fullName)}!
                        </h1>
                    </li>
                    <li style={{alignSelf:'center'}}>
                        {!uploadStyling && 
                            <button className="reserve-button" onClick={showUploadStayTogle}>Add new stay</button>
                        }
                    </li>
                    <li>
                        <p>Total income:${utilService.getUsPrice(getIncome())}</p>
                    </li>
                </div>
                {uploadStyling && <UploadStay getStays={getStays} showUploadStayTogle={showUploadStayTogle} />}
                {listingsDetailsStyling && <div>
                    <div className="reservations-container">

                        <h1>Your reservations:</h1>
                        <table className="reservations-table" >
                            <thead>
                                <tr>
                                    <th>Guest Name</th>
                                    <th>Property</th>
                                    <th>Guests</th>
                                    <th>Check-in</th>
                                    <th>Check-out</th>
                                    <th>Total Price</th>
                                    <th>options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map(reservation =>
                                    <tr>
                                        <ReservationPreview2 getReservations={getReservations} reservation={reservation} key={reservation._id} />
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>}

                {listingsDetailsStyling && <section >
                    <h1>Your stays:</h1>
                    <div className="card-container" >
                        {hostStays.map(stay =>
                            <StayPreview stay={stay} key={stay._id} />
                        )}
                    </div>
                </section>}
            </div>}
        </div>
    )
}


