import { NavLink } from "react-router-dom"
import { useDispatch} from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"


export const HomeImgCard = (props) => {
    const dispatch = useDispatch()

    const dispatchFilter = () => {
        dispatch(changeFilter({ location: props.city.name, from: null, to: null }))
    }

    return (
        <div className="home-page-card">
            {props.city &&
                <NavLink to='/explore' onClick={dispatchFilter}>
                    <img className="img-cover" src={props.city.imgURL}></img>
                    <h1>{props.city.name}</h1>
                </NavLink>
            }
            {props.stay &&
                <NavLink to={`/stay/${props.stay._id}`}>
                    <img className="img-cover" src={props.stay.imgUrls[0]}></img>
                    <h1>{props.stay.name}</h1>
                </NavLink>}
        </div>
    )
}