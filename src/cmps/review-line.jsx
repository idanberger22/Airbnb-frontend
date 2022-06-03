import { useEffect, useState } from "react"


export const ReviewLine = ({ review }) => {
    useEffect(() => {
    }, [])

    const monthNumberToLabelMap = {
        [1]: 'January ',
        [2]: 'February ',
        [3]: 'March ',
        [4]: 'April ',
        [5]: 'May ',
        [6]: 'June ',
        [7]: 'July ',
        [8]: 'August ',
        [9]: 'September ',
        [10]: 'October ',
        [11]: 'November ',
        [12]: 'December ',
      }

    return <section>
        <div className="review-line-card">
            <div className="header">
                <img src={review.by.imgUrl} ></img>
                <div className="aside">
                    <div className="name">
                        <h1 className="font-medium">{review.by.fullname}</h1>
                    </div>
                    <div className="at">
                        <h1>{monthNumberToLabelMap[review.at.slice(6,7)]}{review.at.slice(0,4) }</h1>
                        
                    </div>
                </div>
            </div>
            <p className="content">
                {review.txt.slice(0,200)}
                {review.txt.length > 200 && '...'}
                {review.txt.length > 200 && <span className="review-more"><br />Show more</span>}
            </p>
        </div>

    </section>

}