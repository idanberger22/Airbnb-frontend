import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { UserMenuModal } from "./user-menu-modal"
import { showLargeFilter, showSmallFilter } from "../store/actions/headerAction"
import { userService } from "../services/user.service"


export function AppFooterMobile() {

    const { isModalOpen } = useSelector((storeState) => storeState.userModule)
    const [menuModalShow, setMenuModalShow] = useState('none')
    const [loggedinUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const logged = useSelector((storeState) => storeState.userModule.loggedinUser)

    useEffect(() => {
        setLoggedInUser(userService.getLoggedinUser())  
    }, [logged])

    useEffect(() => {
        setLoggedInUser(userService.getLoggedinUser)
    }, [isModalOpen])


    const removeOnLogout = () => {
        setLoggedInUser(null)
    }

    const toggleModal = () => {
        setMenuModalShow((menuModalShow === 'none') ? 'flex' : 'none')
    }

    const getImg = () => {
        if (loggedinUser) {
            if (loggedinUser.imgUrl) return <img src={loggedinUser.imgUrl} className='user-icon'/>
            else return <img src={require("../assets/imgs/user-icon.png")} className='user-icon'/>
        }
        else return <img src={require("../assets/imgs/user-icon.png")} className='user-icon'/>
    }

    return (

        <div id="main-footer" className="stock-margin fixed main-footer footer-mobile">
            <div >
                <li ><NavLink className="font-medium" to='/'>
                    <span className="material-icons">
                        home
                    </span>
                </NavLink></li>

                <li ><NavLink className="font-medium" to='/explore'>
                    <span className="material-icons">
                        search
                    </span>
                </NavLink></li>
                <li onClick={toggleModal}>
                    {getImg()}
                </li>
            </div>

            <div style={{ display: menuModalShow, position:'fixed'}}>
                    <div  className="screen" onClick={toggleModal}></div>
                    <UserMenuModal toggleModal={toggleModal} removeOnLogout={removeOnLogout} loggedinUser={loggedinUser} />
                </div>
        </div>

    )
}