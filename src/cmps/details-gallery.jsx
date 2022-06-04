import { useEffect, useState } from "react"


export const DetailsGallery = ({stay}) => {


    useEffect(() => {
        
       
        
    
    }, [])

    // { if (!stay) return (<h1>loading</h1>) }


    return <section className="gallery-grid" >
       
        {stay.imgUrls[0] ? <img src={stay.imgUrls[0]}></img> : <img src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg" ></img>}
        {stay.imgUrls[1] ? <img src={stay.imgUrls[1]}></img> : <img src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg" ></img>}
        {stay.imgUrls[2] ? <img src={stay.imgUrls[2]}></img> : <img src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg" ></img>}
        {stay.imgUrls[3] ? <img src={stay.imgUrls[3]}></img> : <img src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg" ></img>}
        {stay.imgUrls[4] ? <img src={stay.imgUrls[4]}></img> : <img src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg" ></img>}
        
       
       
        
        
        
    </section>
    
}