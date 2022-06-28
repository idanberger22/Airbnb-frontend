import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"
import { MainFilter } from "./main-filter"
import { SmallFilter } from "./small-filter"
import { useEffect, useState } from "react"
import { UserMenuModal } from "./user-menu-modal"
import { showLargeFilter, showSmallFilter } from "../store/actions/headerAction"
import { userService } from "../services/user.service"
import whiteLogo from "../assets/imgs/logo-white.png"
import redLogo from "../assets/imgs/logo1.png"
import { ConfirmedResModal } from "./confirmed-res-modal"
import { UserMsg } from "./user-msg"
import { stayService } from "../services/stay.service"

export const AppHeader = () => {

    const LargeFilterShow = useSelector((storeState) => storeState.headerModule.isLargeFilterShown)
    const smallFilterShow = useSelector((storeState) => storeState.headerModule.isSmallFilterShown)
    const isLogoWhite = useSelector((storeState) => storeState.headerModule.isLogoWhite)
    const { isModalOpen } = useSelector((storeState) => storeState.userModule)
    const ReservationConfirmed = useSelector((storeState) => storeState.reservationModule.ReservationConfirmed)
    const [smallFilterStyle, setsmallFilterStyle] = useState({ display: 'block' })
    const [menuModalShow, setMenuModalShow] = useState('none')
    const [logoColor, setLogoColor] = useState({ color: 'red' })
    const [logoImgSrc, setogoImgSrc] = useState("../assets/imgs/logo1.png")
    const [showModalConfirmed, setShowModalConfirmed] = useState(false)
    const [hostBtnTxt, setHostBtnTxt] = useState('Become a host')
    const [loggedinUser, resetLoggedInUser] = useState(userService.getLoggedinUser())
    const logged = useSelector((storeState) => storeState.userModule.loggedinUser)

    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('scroll', changeCss, { passive: true });
        updateLogoColor()
        return () => {
            window.removeEventListener('scroll', changeCss, { passive: true });
        }
    }, [])

    useEffect(() => {
        if(!logged) setHostBtnTxt('Become a host')
        else getUserStays()
    }, [logged])


    const getUserStays = async () => {
        const stays = await stayService.getByHostId(logged._id)
        if(stays && stays.length > 0 ) setHostBtnTxt('Host dashboard')
    }


    useEffect(() => {
        resetLoggedInUser(userService.getLoggedinUser)
    }, [isModalOpen])

    useEffect(() => {
        if (ReservationConfirmed) setShowModalConfirmed(true)
        else setShowModalConfirmed(false)
    }, [ReservationConfirmed])

    useEffect(() => {
        if (smallFilterShow) setsmallFilterStyle({ display: 'block' })
    }, [smallFilterShow])

    useEffect(() => {
        updateLogoColor()
    }, [isLogoWhite])

    const updateLogoColor = () => {
        if (isLogoWhite) {
            setLogoColor({ color: 'white' })
            setogoImgSrc(whiteLogo)
            document.documentElement.style.setProperty('--headerbackgroundColor', 'unset');
            document.documentElement.style.setProperty('--bgc', '#unset');
            document.documentElement.style.setProperty('--headerFontColor', '#F7F7F7');
            document.documentElement.style.setProperty('--headerbackgroundColor', '#unset');
        }
        else {
            setLogoColor({ color: 'red' })
            setogoImgSrc(redLogo)
            document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
            document.documentElement.style.setProperty('--bgc', '#F7F7F7');
            document.documentElement.style.setProperty('--headerFontColor', '#000');
            document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
        }
    }

    const changeCss = () => {
        const scrollValue = document.documentElement.scrollTop
        if (scrollValue) {
            dispatch(showSmallFilter())
        }
    }

    const onPresentFilter = () => {
        dispatch(showLargeFilter())
    }

    const resetFilterBy = () => {
        dispatch(changeFilter({ location: '', from: null, to: null }))
    }

    const removeOnLogout = () => {
        resetLoggedInUser(null)
    }

    const toggleModal = () => {
        setMenuModalShow((menuModalShow === 'none') ? 'flex' : 'none')
    }
    const getImg = () => {
        if (loggedinUser) {
            if (loggedinUser.imgUrl) return <img src={loggedinUser.imgUrl} className='user-icon' />
            else return <img src={require("../assets/imgs/user-icon.png")} className='user-icon' />
        }
        else return <img src={require("../assets/imgs/user-icon.png")} className='user-icon' />
    }

    return (
        <header id="main-header" className="stock-margin main-header app-header-main">
            {showModalConfirmed && <ConfirmedResModal reservation={ReservationConfirmed} />}
            <div className="left"></div>
            <div className="stock-margin-center flex-col">
                <nav className="grid-3-col main-nav">
                    <div className="logo" onClick={resetFilterBy}>
                        <NavLink to='/home'>
                            <div className="logo">
                                <li>
                                    <img src={logoImgSrc} alt="" />
                                </li >
                                <li className="font-bold" style={logoColor}>
                                    Staybnb
                                </li>
                            </div>
                        </NavLink>
                    </div>
                    <div onClick={() => onPresentFilter()} className="small-filte-parent" >
                        <div className="explore-filterr filterr small">
                            <div style={smallFilterStyle} >
                                {smallFilterShow && <SmallFilter />}
                            </div>
                        </div>
                    </div>
                    <div className="nav-link-parent">
                        <li onClick={resetFilterBy}><NavLink className="font-medium" to='/explore'>Explore</NavLink></li>
                        <li onClick={resetFilterBy}><NavLink className="font-medium" to='/host'>{hostBtnTxt}</NavLink></li>
                        <li>
                            <div className='user-menu noselect' onClick={toggleModal}>
                                <div>
                                    <span className="material-icons">menu</span>
                                </div>
                                <div>
                                    {getImg()}
                                </div>
                            </div>
                            <div style={{ display: menuModalShow }}>
                                <div className="screen" onClick={toggleModal}></div>
                                <UserMenuModal toggleModal={toggleModal} removeOnLogout={removeOnLogout} loggedinUser={loggedinUser} />
                            </div>
                        </li>
                    </div>
                </nav>
                <div className="explore-filterr filterr big">
                    <div>
                        {LargeFilterShow && <MainFilter />}
                    </div>
                </div>
                <UserMsg />
            </div>
            <div className="right"></div>
        </header >
    )
}