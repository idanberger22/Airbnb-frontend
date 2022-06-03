import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"
import { NavLink } from "react-router-dom"
import { DateRangeSelector } from "./date-picker"
export const SmallFilter = () => {

    const dispatch = useDispatch()
    const [filterBy, setFilterBy] = useState({ location: '', from: null, to: null })
    const  loadedFilter  = useSelector((storeState) => storeState.stayModule.filterBy)
    

    useEffect(() => {
        if(filterBy.location !== loadedFilter.location || 
            filterBy.from !== loadedFilter.from ||
            filterBy.to !== loadedFilter.to) setFilterBy(loadedFilter)
    }, [])

    const dispatchFilter = () => {
        dispatch(changeFilter(filterBy))
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        setFilterBy({ ...filterBy, [field]: value })
    }

    const handleDate = (dates)=>{
        if (dates.startDate) setFilterBy({...filterBy,from:dates.startDate})
        if(dates.endDate)   setFilterBy({...filterBy,to:dates.endDate})      
    }

    return (
        <div className="total-filter">
            <div className="inpt-fillter">
                <input name="location" value={filterBy.location} type="text" placeholder="Start your search" onChange={handleChange} />
            </div>
            <NavLink className="navlink" to='/explore'>
                <div onClick={dispatchFilter}>
                    <div className="inpt-fillter search-symbol">
                        <span className="material-symbols-sharp white">search</span>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}