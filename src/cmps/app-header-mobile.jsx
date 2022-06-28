import { useState } from "react"
import { NavLink } from "react-router-dom"
import { DateRangeSelector } from "./date-picker"
import { SmallFilter } from "./small-filter"
import { UserMsg } from "./user-msg"


export const AppHeaderMobile = () => {

    const [modalIsOpen, setModalIsOpen] = useState({ display: 'none' })


    const openSearchDropDown = () => {
        setModalIsOpen({ display: 'block' })
    }



    return (
        <header id="main-header" className="stock-margin main-header mobile-header">
            {/* {showModalConfirmed && <ConfirmedResModal reservation={ReservationConfirmed} />} */}
            <div className="left"></div>
            <div className="stock-margin-center flex-col">
                <nav className="grid-3-col main-nav">
                    <div onClick={openSearchDropDown} className="explore-filterr filterr small">
                        <SmallFilter />
                        {/* <div style={smallFilterStyle} >
                            {smallFilterShow && <SmallFilter />}
                        </div> */}
                    </div>
                    <div style={modalIsOpen} className="search-drop-down">
                        <input type="text" placeholder="date" />
                        <DateRangeSelector />
                    </div>
                </nav>
                <UserMsg />
            </div>
            <div className="right"></div>
        </header >
    )
}