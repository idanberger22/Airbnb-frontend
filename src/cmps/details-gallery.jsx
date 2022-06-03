import { useEffect, useState } from "react"


export const DetailsGallery = ({stay}) => {


    useEffect(() => {
        
       
        
    
    }, [])

    // { if (!stay) return (<h1>loading</h1>) }


    return <section className="gallery-grid" >
       
        <img src={stay.imgUrls[0]}></img>
        
       
        <img src={stay.imgUrls[1]}></img>
        
        
        <img src={stay.imgUrls[2]}></img>
       
        
        <img src={stay.imgUrls[3]}></img>
       
       
        <img src={stay.imgUrls[4]}></img>
        
        
        
    </section>
    
}