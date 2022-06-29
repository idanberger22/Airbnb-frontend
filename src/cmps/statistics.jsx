import { utilService } from "../services/util.service"
import { useEffect, useState } from "react"
export const Statistics = ({ reservations, hostStays }) => {

    const [avgRate, setAvgRate] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [nIghtsAvg, setNIghtsAvg] = useState('no reservations yet')

    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = () => {
        if (!reservations) return
        let income = 0
        let nights = 0
        let rate = 0
        reservations.forEach(res => {
            income += res.totalPrice
            nights += res.nights
        })
        setTotalIncome(utilService.make2digits(income))
        setNIghtsAvg(utilService.make2digits(nights / reservations.length))
        hostStays.forEach(stay => rate += stay.reviewScores.value / 2)
        setAvgRate(utilService.make2digits(rate / hostStays.length))
    }

    const getClass = () => {
        let className = document.body.clientWidth<640? 'center statics-container' : 'flex-row-space-btw statics-container'
        console.log(className)
        return className
    }

    return (<section>
        <div className={getClass()}>
            <div className="center">
                <h1>
                    {avgRate}★
                </h1>
                <h3>
                    Overall rating
                </h3>
            </div>
            <div className="center">

                <h1>
                    {nIghtsAvg} nights
                </h1>
                <h3>
                    Average nightly rate
                </h3>
            </div>
            <div className="center" style={{marginRight:'auto'}}>

                <h1>
                    ${totalIncome}
                </h1>
                <h3>
                    Total income
                </h3>

            </div>

        </div>
    </section>
    )
}