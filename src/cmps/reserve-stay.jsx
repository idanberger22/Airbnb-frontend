import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { DateRangeSelector } from './date-picker'
import { GuestPicker } from "./guest-picker"
import { utilService } from "../services/util.service"
import { userService } from "../services/user.service"
import { tripsService } from "../services/trips.service"
import { openModal } from "../store/actions/userActions"
import { reservationService } from "../services/reservation.service"
import { ReservationConfirmed } from "../store/actions/reservation.action"
import { NavLink } from "react-router-dom"


export function ReserveStay(props) {
    const [reservation, setReservation] = useState({
        checkIn: null,
        checkOut: null,
        nights: null,
        adults: 1,
        childrens: 0,
        totalPrice: 0,
        userId: null,
        user: null,
        stay: {
            name: props.stay.name,
            _id: props.stay._id,
            img: props.stay.imgUrls[0],
            address: props.stay.address
        },
        hostId: props.stay.host._id,
        hostName: props.stay.host.fullname
    })

    const [showGuestsStyle, setShowGuestsStyle] = useState('expand_more')
    const [reservedBtnBc, setReservedBtnBc] = useState({ backgroundColor: `green` })
    const [guestModalShown, setGuestModalShown] = useState({ display: 'none' })
    const [isTrue, setIstrue] = useState(false)
    const [resModalIsOpen, setResModalIsOpen] = useState(false)
    const [resNights, setResNights] = useState(null)

    const dispatch = useDispatch()

    const dispatchReservation = () => {
        dispatch(ReservationConfirmed(reservation))
    }

    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    useEffect(() => {
        setDatesAndPrice(filterBy.from, filterBy.to)
    }, [])

    const onUpdateGuestsQty = (adults, childrens) => {
        setReservation({ ...reservation, adults, childrens })
    }

    const onShowGusts = (isTrue) => {
        if (isTrue === false) {
            setGuestModalShown({ display: 'block' })
            setShowGuestsStyle('expand_less')
        }
        else {
            setShowGuestsStyle('expand_more')
            setGuestModalShown({ display: 'none' })
        }
        setIstrue(!isTrue)
    }

    const setDatesAndPrice = (from, to) => {
        if (from && to) {
            const dayDiff = (to - from) / 1000 / 60 / 60 / 24
            setResNights(dayDiff)
            setReservation({ ...reservation, checkIn: from._d, checkOut: to._d, totalPrice: dayDiff * props.stay.price +25, nights: dayDiff })
        }
    }

    const reserveStay = async () => {
        reservation.user = userService.getLoggedinUser()
        if(!reservation.user){
            dispatch(openModal(true))
            return
        } 
        reservation.userId = userService.getLoggedinUser()._id
        if (!reservation.checkIn || !reservation.checkOut || (reservation.adults + reservation.childrens) === 0) console.log('fill all details')
        else {
            setResModalIsOpen(true)
            const newRes = await reservationService.addReservation(reservation)
            dispatchReservation(reservation)
            tripsService.addTrip(reservation)
        }
    }

    const onMousMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
        setReservedBtnBc({ '--mouse-y': y, '--mouse-x': x })
    }

    return (
        <div className="reserve-stay-container">
            <div className="reserve-stay-header">
                <li className="reserve-stay-price font-book">${utilService.getUsPrice((props.stay.price))} <span>night</span></li>
                <li>{props.stay.reviewScores.value / 2}<span className="material-icons" style={{margin:'auto 3px'}}>star</span> · <span >{props.stay.reviews.length} reviews</span></li>
            </div>
            <div className="picker-container">
                    <DateRangeSelector place={'reserve'} startDate={filterBy.from} endDate={filterBy.to} setDatesAndPrice={setDatesAndPrice} />
                <div onClick={() => onShowGusts(isTrue)} className="guests-pick clickable">
                    <div className="flex-col">
                        <h5 >GUESTS</h5>
                        {((reservation.adults + reservation.childrens) < 1) && <div><h4>Add guests</h4></div>}
                        {((reservation.adults + reservation.childrens) > 0) && <div><h4>{(reservation.adults + reservation.childrens)} guest{((reservation.adults + reservation.childrens) > 1) && 's'}</h4> </div>}
                    </div>
                    <div className="arrow"><span className="material-icons cursor">{showGuestsStyle}</span></div>
                </div>
                {!resModalIsOpen && 
                <div style={guestModalShown}>
                    <GuestPicker className="guest-picker" onUpdateGuestsQty={onUpdateGuestsQty} />
                </div>
                }
            </div> 
            <button onClick={reserveStay} onMouseMove={(e) => onMousMove(e)} style={reservedBtnBc} className='reserve-button'>Reserve</button>
           {!resModalIsOpen &&  <section className="price-section">
                {(reservation.adults!=0 || reservation.childrens!=0) && reservation.checkIn && reservation.checkOut && <div>
                    <h4>You won't be charged yet</h4>
                    <div className="flex-row-space-btw price">
                        <h1 className="underline">${utilService.getUsPrice(props.stay.price)} <span>x</span> {resNights} nights</h1>
                        <h1>${utilService.getUsPrice(props.stay.price * resNights)}</h1>
                    </div>
                    <div className="flex-row-space-btw service-fee">
                        <h1 className="underline">Service fee</h1>
                        <h1>$25</h1>
                    </div>
                    <div className="flex-row-space-btw total">
                        <h1 className="font-bold">Total</h1>
                        <h1 className="font-bold">${utilService.getUsPrice((reservation.totalPrice))}</h1>
                    </div>
                </div>}


            </section>}
        </div>
    )
}