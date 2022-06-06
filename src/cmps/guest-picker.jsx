import { useEffect, useRef, useState } from "react"

export const GuestPicker = (props) => {

    const [adultsQty, setAdultsQty] = useState(1)
    const [childsQty, setChildsQty] = useState(0)
    
    const onUpdateQty = (type,dif) => {
        if(type === 'adult') {
            const adults = adultsQty+dif
            if(adults<1) adults = 1
            setAdultsQty(adults)
            props.onUpdateGuestsQty(adults, childsQty)
        }
        else{
            const childs = childsQty+dif
            if(childs<0) childs = 0
            setChildsQty(childs)
            props.onUpdateGuestsQty(adultsQty, childs)

        }
    }

    


    return (<section className="main-guest-qty-container">
        <div className="adults">
            <div>Adults</div>
            <div className="adults-right">

                <div>
                    <span onClick={()=>onUpdateQty('adult',-1)} className="material-icons">remove</span>
                </div>
                <div className="flex-col-space-around between-btns">
                    {adultsQty}
                </div>
                <div>
                    <span onClick={()=>onUpdateQty('adult',1)}className="material-icons">add</span>
                </div>
            </div>
        </div>
        <div className="adults">
            <div>Children</div>
            <div className="adults-right">

                <div>
                    <span onClick={()=>onUpdateQty('child',-1)} className="material-icons">remove</span>
                </div>
                <div className="flex-col-space-around between-btns">
                    {childsQty}
                </div>
                <div>
                    <span onClick={()=>onUpdateQty('child',1)}className="material-icons">add</span>
                </div>
            </div>
        </div>
        <div className="childrens"></div>



    </section>


    )
}