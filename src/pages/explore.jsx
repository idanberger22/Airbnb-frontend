import { useEffect, useRef, useState } from "react"
import { stayService } from "../services/stay.service"
import { StayPreview } from "../cmps/stay-preview"
// import { stayService } from "../services/stay.service"
import { ExploreFilter } from "../cmps/explore-filter"
import { showLargeFilter, showSmallFilter, LogoChangeToWhite } from "../store/actions/headerAction"
import { useDispatch, useSelector } from 'react-redux'

export function Explore() {
    const [headerFontColor, setHeaderFontColor] = useState('white')
    const [stays, setStays] = useState(null)
    const { filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()

    useEffect(() => {
        getStays()
        dispatch(LogoChangeToWhite(false))

        document.documentElement.style.setProperty('--headerFontColor', '#000');
        document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
        window.addEventListener('scroll', changeCss);
        
        return () => {
            
            window.removeEventListener('scroll', changeCss);
            document.documentElement.style.setProperty('--headerbackgroundColor', 'unset');
            document.documentElement.style.setProperty('--headerFontColor', '#fff');
        }

    }, [filterBy])

    const changeCss = () => {
        var bodyElement = document.querySelector("body");
        var navElement = document.querySelector(".explore-filterr");
        // this.scrollY > 5 ? navElement.style.visibility = 'hidden' : navElement.style.visibility = 'visible';
      }

    const getStays = async () => {
        const stays = await stayService.query(filterBy)
        setStays(stays)
        console.log('stays',stays)
    }

    const onChangeExploreFilter = async (exploreFilterBy) => {
        const stays = await stayService.query(filterBy, exploreFilterBy)
        setStays(stays)
    }

    { if (!stays ) return (<h1>Loading</h1>) }
    return (
        <div className="stock-margin">
            <div className="stock-margin-center">
                <div>
                    <ExploreFilter stays={stays} onChangeExploreFilter={onChangeExploreFilter} />
                </div>
                <section >
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