import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"
import { NavLink } from "react-router-dom"
export const SmallFilter = () => {

    const dispatch = useDispatch()
    const [filterBy, setFilterBy] = useState({ location: '', from: null, to: null })
    const loadedFilter = useSelector((storeState) => storeState.stayModule.filterBy)


    useEffect(() => {
        filterBy.location = loadedFilter.location
    }, [loadedFilter])

    const dispatchFilter = () => {
        dispatch(changeFilter(filterBy))
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        setFilterBy({ ...filterBy, [field]: value })
    }

    return (
        <div className="total-filter">
            <div className="inpt-fillter">
                <input name="location" value={loadedFilter.location} type="text" placeholder="Start your search" onChange={handleChange} />
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