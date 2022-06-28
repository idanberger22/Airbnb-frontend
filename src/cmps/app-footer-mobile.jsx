import { useState } from "react";
import { NavLink } from "react-router-dom";


export function AppFooterMobile() {


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
                <li ><NavLink className="font-medium" to='/trips'>
                    <img src={require("../assets/imgs/logo1.png")} />
                </NavLink></li>
                <li ><NavLink className="font-medium" to='/host'>
                    <img src={require("../assets/imgs/user-icon.png")} />

                </NavLink></li>

            </div>
        </div>

    )
}