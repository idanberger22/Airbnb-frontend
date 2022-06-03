import { useEffect, useRef, useState } from "react"
import {React} from "react"

export function ReserveStayDatesGuests() {
    return (
        <div className="dates-grid">
            <div className="cell top-left">
            <input type="date" placeholder="check-in"/></div>
            <div className="cell top-right">
                <input type="date" placeholder="check-out" />
            </div>
            <div className="cell middle">
                <input type="text" placeholder="guests" /></div>           
        </div>
    )
}