import { NavLink } from "react-router-dom"
import { useDispatch, dispatch } from 'react-redux'
import { openModal } from "../store/actions/userActions"
import { userService } from "../services/user.service"
import { ReservationConfirmed } from "../store/actions/reservation.action"
import { utilService } from "../services/util.service"
import { useState } from "react"


export const ConfirmedResModal = (props) => {

    const dispatch = useDispatch()

    const [modalStyling, setShowmodalStyling] = useState ({display: 'block'})
    const [mouse,setMouse] =useState({mouseX:'',mouseY:''})

    const dispatchReservation = () => {
        dispatch(ReservationConfirmed(null))
    }


    const loggedinUser = userService.getLoggedinUser()

    const toggleModal = (isLogin) => {
        dispatch(openModal(isLogin))
        closeSelf()
    }

    const closeSelf = () => {
        props.toggleModal()
    }

    const closeModal = () => {
        setShowmodalStyling({display: 'none'})
        // props.ModalIsOpen(false)
        dispatchReservation()
    }

    const onLogout = () => {
        userService.logout()
        closeSelf()
    }

    const onMousMove = (e) => {
        setMouse({ mouseX: e.screenX, mouseY: e.screenY })
    }

    {if (!props.reservation) return <h1>loading...</h1>}

    return (<>
    <div style={modalStyling} className='modal-blur' onClick={closeModal}></div>
    <section style={modalStyling}  className="res-confirmed-modal">
        
        <img src={props.reservation.stay.img} alt="" />
        <span onClick={closeModal} className="material-icons clickable close-modal">close</span>
        <div className="bottom-container">

            <h1>Your reservation at {props.reservation.hostName}'s' place is confirmed!</h1>


            <div className="dates-container">

                <div>
                    <li>
                        <h2>

                        Check in:
                        </h2>
                    </li>
                    <li>
                        <h3>
                        {props.reservation.checkIn.toISOString().split('T')[0]}
                        </h3>
                    </li>
                </div>
                <span>
                    |
                </span>
                <div>
                    <div>
                        <li>
                            <h2>

                            Check out:
                            </h2>
                        </li>
                        <li>
                            <h3>

                            {props.reservation.checkOut.toISOString().split('T')[0]}
                            </h3>
                        </li>
                    </div>
                </div>
            </div>

            <div className="guests">
                <h2>Who's coming</h2>
                <h3>
                    {props.reservation.adults != 0 && <h3>Adults: {props.reservation.adults}</h3>}
                </h3>
                <h3>
                    {props.reservation.childrens != 0 && <h3>Childrens: {props.reservation.childrens}</h3>}
                </h3>
            </div>

            <div className="address">
                <h2>
                    Address
                </h2>
                <h3>
                    {props.reservation.stay.address.street}
                </h3>
                </div>
                <div className="price">
                <h2>
                    Total Price
                </h2>
                <h3>
                    ${utilService.getUsPrice(props.reservation.totalPrice)}
                </h3>

            </div>
            <div>

            <NavLink className='' to='/trips' >
            <button onClick={()=>closeModal()} className="reserve-button" onMouseMove={onMousMove} style={{ '--mouse-x' :mouse.mouseX, '--mouse-y': mouse.mouseY}}>
                Your trips
                </button>
            </NavLink>
            </div>

        </div>
        

    </section>
    </>


    )
}