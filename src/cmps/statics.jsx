import { NavLink } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { openModal, logOut } from "../store/actions/userActions"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"
import { useEffect, useState } from "react"
export const Statics = ({ reservations, hostStays }) => {

    const [avgRate, setAvgRate] = useState(null)
    const [totalIncome, setTotalIncome] = useState(null)
    const [nIghtsAvg, setNIghtsAvg] = useState(null)




    useEffect(() => {
        getDetails()

    }, [])



    const getDetails = () => {
        if (!reservations) return 0
        let totalIncome = 0
        let totalRate = 0
        let totalNights = 0
        reservations.forEach(res => totalIncome += res.totalPrice)
        setTotalIncome(totalIncome)
        hostStays.forEach(stay => totalRate += stay.reviewScores.value / 2)
        setAvgRate(Math.round(totalRate / hostStays.length * 100) / 100)
        reservations.forEach(res => totalNights += res.nights)
        setNIghtsAvg(totalNights / reservations.length)

        return totalIncome
    }

console.log(typeof avgRate)

    return (<section>
        <div className="flex-row-space-btw statics-container">
            <div>

                <h1>
                    {avgRate && utilService.make2digits(avgRate)}
                </h1>
                <h3>
                Overall rating
                </h3>
            </div>
            <div>

                <h1>
                    {nIghtsAvg && utilService.make2digits(nIghtsAvg)}
                </h1>
                <h3>
                Average nightly rate
                </h3>
            </div>
            <div>


                <h1>
                    ${utilService.getUsPrice(totalIncome)}
                </h1>
                <h3>
                    Total income
                </h3>

            </div>

        </div>
    </section>
    )
}