import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"
import { NavLink } from "react-router-dom"
import { DateRangeSelector } from "./date-picker"

export const MainFilter = () => {

    const dispatch = useDispatch()
    const [filterBy, setFilterBy] = useState({ location: '', from: null, to: null })
    const loadedFilter = useSelector((storeState) => storeState.stayModule.filterBy)

    useEffect(() => {
        if (filterBy.location !== loadedFilter.location ||
            filterBy.from !== loadedFilter.from ||
            filterBy.to !== loadedFilter.to) setFilterBy(loadedFilter)
    }, [loadedFilter])

    const dispatchFilter = () => {
        dispatch(changeFilter(filterBy))
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        setFilterBy({ ...filterBy, [field]: value })
    }

    const handleDate = (dates) => {
        if (dates.startDate) setFilterBy({ ...filterBy, from: dates.startDate })
        if (dates.endDate) setFilterBy({ ...filterBy, to: dates.endDate })
    }

    const clearFilterBy = () => {
        setFilterBy({ ...filterBy, location: '' })
        dispatchFilter()
    }

    return (
        <div className="total-filter">
            <div className="inpt-fillter">
                <div className="center" style={{alignItems:'flex-start'}}>
                    <label htmlFor='main-input' className="main-filter-label font-bold clickable">Where</label>
                    <input name="location" value={filterBy.location} type="text" placeholder="Search destination" onChange={handleChange} autoComplete='off' id='main-input'/>
                </div>
            </div>
            <div className="inpt-fillter center" style={{position:'relative'}}>
            <label className="main-filter-label font-bold clickable checkin-pos">Check in</label>
            <label className="main-filter-label font-bold clickable checkout-pos">Check out</label>
            <div className="placeholder" style={{width:'5px',height:'13px'}}></div>

                <DateRangeSelector place={'filter'} handleDate={handleDate} startDate={loadedFilter.from} endDate={loadedFilter.to} />
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