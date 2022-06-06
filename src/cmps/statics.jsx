import { NavLink } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { openModal, logOut } from "../store/actions/userActions"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"
import { useEffect, useState } from "react"
export const Statics = ({reservations, hostStays}) => {

    const [avgRate, setAvgRate] = useState(null)
    const [totalIncome, setTotalIncome] = useState(null)




    useEffect(() => {
        getDetails()
       
    }, [])



    const getDetails = () => {
        if (!reservations) return 0
        let totalIncome = 0
        let totalRate = 0
        reservations.forEach(res => totalIncome += res.totalPrice)
        setTotalIncome(totalIncome)
        hostStays.forEach(stay => totalRate += stay.reviewScores.value/2)
        setAvgRate(totalRate/hostStays.length)

        return totalIncome
    }



    return (<section>
        <div>
            <h1>

            {avgRate}
            </h1>

        </div>
        <li>
            <p>Total income:${utilService.getUsPrice(totalIncome)}</p>
        </li>

    </section>
    )
}