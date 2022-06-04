import React from 'react'
import 'rc-slider/assets/index.css'
import { useEffect, useRef, useState } from "react"
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { PriceModal } from './price-modal'

export const ExploreFilter = (props) => {
    const timeOutId = useRef()

    const [exploreFilterBy, setExploreFilterBy] = useState({
        minPrice: 0,
        maxPrice: 1200,
        roomTypes: ['Entire home/apt', 'Hotel room', 'Private room', 'Shared room'],
        amenities: []
    })
    
    const [checked, setChecked] = useState({ entire: true, hotel: true, private: true, shared: true });
    const [priceIsShown, setPriceIsShown] = useState(false)
    const [typeIsShown, setTypeIsShown] = useState(false)
    const [pricesData, setPricesData] = useState(null)
    const amenities = ['Wifi', 'TV', 'Kitchen', 'Air conditioning']

    useEffect(() => {
        getPricesData()

    }, [props.stays])

    const onShown = (type) => {
        setPriceIsShown(false)
        setTypeIsShown(false)
        if (type === 'Price') {
            setPriceIsShown(!priceIsShown)
        }
        else {
            setTypeIsShown(!typeIsShown)
        }
    }

    const getPricesData = () => {
        const data = props.stays.map(stay => {
            return { price: stay.price }
        })
        data.sort(function (a, b) {
            return a.price - b.price;
        });
        setPricesData(data)
    }

    useEffect(() => {
        props.onChangeExploreFilter(exploreFilterBy)
    }, [exploreFilterBy])

    const handleButtonChange = (amenity) => {
        if (exploreFilterBy.amenities.includes(amenity)) {
            setExploreFilterBy({ ...exploreFilterBy, amenities: exploreFilterBy.amenities.filter(amn => amn !== amenity) })
        }
        else setExploreFilterBy({ ...exploreFilterBy, amenities: [...exploreFilterBy.amenities, amenity] })
    }

    const handlePriceRange = (value) => {
        if (timeOutId.current) clearTimeout(timeOutId.current)
        timeOutId.current = setTimeout(setExploreFilterBy, 500, { ...exploreFilterBy, minPrice: value[0], maxPrice: value[1] })
    }

    const handleRoomType = (roomType, type) => {
        let newRoomTypes
        setChecked({ ...checked, [type]: !checked[type] })
        if (exploreFilterBy.roomTypes.includes(roomType)) newRoomTypes = exploreFilterBy.roomTypes.filter(typeOfRoom => typeOfRoom !== roomType)
        else newRoomTypes = [...exploreFilterBy.roomTypes, roomType]
        setExploreFilterBy({ ...exploreFilterBy, roomTypes: newRoomTypes })
    }

    const getClass = (type) => {
        let className = 'mini-filter'
        if (type === 'price' && (exploreFilterBy.minPrice > 0 || exploreFilterBy.maxPrice < 1200)) className += ' small-border'
        else if (type === 'roomType' && exploreFilterBy.roomTypes.length < 4) className += ' small-border'
        else if (exploreFilterBy.amenities.includes(type)) className += ' small-border'
        return className
    }

    if (!pricesData) return <h1>loading</h1>
    return (
        <div className='secondary-filter'>
            {priceIsShown&&<PriceModal exploreFilterBy={exploreFilterBy} handlePriceRange={handlePriceRange}/>}
            {typeIsShown && <div className='room-type-filter noselect'>
                <FormGroup>
                    <label><Checkbox sx={{ color: '#FE385C', '&.Mui-checked': { color: '#222222', }, }}
                        onChange={() => handleRoomType('Entire home/apt', 'entire')} checked={checked.entire} inputProps={{ 'aria-label': 'controlled' }} />
                        <div><span>Entire home</span><p>A place all for yourself</p></div></label>
                    <label><Checkbox sx={{ color: '#FE385C', '&.Mui-checked': { color: '#222222', }, }}
                        onChange={() => handleRoomType('Hotel room', 'hotel')} checked={checked.hotel} inputProps={{ 'aria-label': 'controlled' }} />
                        <div><span>Hotel Room</span><p>A private or shared room in a boutique hotel</p></div></label>
                    <label><Checkbox sx={{ color: '#FE385C', '&.Mui-checked': { color: '#222222', }, }}
                        onChange={() => handleRoomType('Private room', 'private')} checked={checked.private} inputProps={{ 'aria-label': 'controlled' }} />
                        <div><span>Private room</span><p>Your own room in a home or a hotel, plus some shared common spaces</p></div></label>
                    <label><Checkbox sx={{ color: '#FE385C', '&.Mui-checked': { color: '#222222', }, }}
                        onChange={() => handleRoomType('Shared room', 'shared')} checked={checked.shared} inputProps={{ 'aria-label': 'controlled' }} />
                        <div><span>Shared room</span><p>A sleeping space and common areas that may be shared with others</p></div></label>
                </FormGroup>
            </div>}

            <div >
                <div className='amn-container noselect'>
                    <div className="enity-filter">
                        <div className={getClass('price')} onClick={() => onShown('Price')}>Price</div>
                    </div>
                    <div className="enity-filter">
                        <div className={getClass('roomType')} onClick={() => onShown('Type of place')}>Type of place</div>
                    </div>
                    <span className="enity-filter separator">|</span>
                    {amenities.map(amenity => <div className="enity-filter" key={amenity}>
                        <div className={getClass(amenity)} onClick={() => handleButtonChange(amenity)}>{amenity}</div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}





