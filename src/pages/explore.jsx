import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { StayPreview } from "../cmps/stay-preview"
import { ExploreFilter } from "../cmps/explore-filter"
import { LogoChangeToWhite } from "../store/actions/headerAction"
import { useDispatch, useSelector } from 'react-redux'


export function Explore() {
    const [stays, setStays] = useState(false)
    const { filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()
    

    useEffect(() => {
        getStays()
        dispatch(LogoChangeToWhite(false))
        document.documentElement.style.setProperty('--headerFontColor', '#000');
        document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
        return () => {
            document.documentElement.style.setProperty('--headerbackgroundColor', 'unset');
            document.documentElement.style.setProperty('--headerFontColor', '#F7F7F7');
        }
    }, [filterBy])

    const getStays = async () => {
        const stays = await stayService.query(filterBy)
        setStays(stays)
    }

    const onChangeExploreFilter = async (exploreFilterBy) => {
        const stays = await stayService.query(filterBy, exploreFilterBy)
        setStays(stays)
    }
    
    
    if (!stays) return ( <div className="loader"></div> )
    
    return (
        <div className="stock-margin">
            <div className="stock-margin-center">
                <div>
                    <ExploreFilter stays={stays} onChangeExploreFilter={onChangeExploreFilter} />
                </div>
                <section >
                    {stays.length===0 && <h1 className="no-stays-msg">No results matches your search...</h1>}
                    {stays.length>0 && <h3 style={{marginTop:'8px'}}>Showing {stays.length} stays</h3>}
                    <div className="card-container" >
                        {stays.map(stay =>
                            <StayPreview stay={stay} key={stay._id} />
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}