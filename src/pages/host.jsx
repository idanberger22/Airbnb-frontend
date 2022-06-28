
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from "../store/actions/userActions"
import { ReservationPreview } from "../cmps/reservation2-preview"
import { reservationService } from "../services/reservation.service"
import { stayService } from "../services/stay.service"
import { StayPreview } from "../cmps/stay-preview"
import { NavLink } from "react-router-dom"
import { utilService } from "../services/util.service"
import { Statistics } from "../cmps/statistics"
import { userService } from "../services/user.service"

export const Host = () => {

    const [reservations, setreservations] = useState(null)
    const [hostStyling, setHostStyling] = useState(true)
    const [listingsDetailsStyling, setListingsDetailsStyling] = useState(true)
    const [hostStays, setHostStays] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const loggedRedux = useSelector((storeState) => storeState.userModule.loggedinUser)
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
        setLoggedInUser(userService.getLoggedinUser())
    }, [loggedRedux])

    useEffect(() => {
        getReservations()
        if (hostStays.length > 0) {
            setHostStyling(true)
            setListingsDetailsStyling(true)
        }
    }, [hostStays])

    const getStays = async () => {
        if (!loggedInUser) {
            setHostStays(null)
            return
        }
        const stays = await stayService.getByHostId(loggedInUser._id)
        if (stays.length === 0) {
            setHostStyling(false)
            setListingsDetailsStyling(false)
        }
        else {
            setHostStyling(true)
        }
        setHostStays(stays)
    }

    const closeMainCover = () => {
        setHostStyling(true)
    }

    const getReservations = async () => {
        if (!loggedInUser) {
            setreservations(null)
            return
        }
        const reservatios = await reservationService.query({ hostId: loggedInUser._id })
        const sortedReservatios = reservatios.sort((a, b) => Date.parse(a.checkIn) - Date.parse(b.checkIn))
        setreservations(sortedReservatios)
    }

    if (!loggedInUser || !reservations || !hostStays) return <div className="loader"></div>

    return (
        <div className="stock-margin main-host-page">
            {console.log('checking')}
            {!hostStyling && <div className="become-a-host">
                <div className="left-side">
                    <div className="logo-become-a-host">
                        <NavLink className='clickable' to='/home'>
                            <img className="host-img" src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654456715/logo-white_yk9z30.png" alt="" />
                        </NavLink>
                    </div>
                    <div className="container">
                        <h1>Open your door to hosting</h1>
                        <NavLink to='/host-your-home'>
                            <button className="reserve-button" onClick={closeMainCover}>Try hosting</button>
                        </NavLink>
                    </div>
                </div>
                <div className="right-side"></div>
            </div>}


            {hostStyling && <div className="stock-margin-center">
                <div className="flex-row-space-btw">
                    <div className="flex">
                        <li>
                            <img src={loggedInUser.imgUrl} alt="" />
                        </li>
                        <li>
                            <h1>
                                Hello {utilService.capitalizeFirst(loggedInUser.fullName)}
                            </h1>
                        </li>
                    </div>
                </div>



                {listingsDetailsStyling && <div>
                    <div className="reservations-container">
                        <Statistics reservations={reservations} hostStays={hostStays} />
                        <div className="flex-col">
                            <h1>Your reservations</h1>
                            <table className="reservations-table" >
                                <thead>
                                    <tr>
                                        <td>Listing</td>
                                        <td>Guests</td>
                                        <td>Check-in</td>
                                        <td>Check-out</td>
                                        <td>Nights</td>
                                        <td>Total Payout</td>
                                        <td>Options</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(reservation =>
                                        <tr key={reservation._id}>
                                            <ReservationPreview getReservations={getReservations} reservation={reservation} key={reservation._id} />
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}

                {listingsDetailsStyling && <section >
                    <h1>Your stays</h1>
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


