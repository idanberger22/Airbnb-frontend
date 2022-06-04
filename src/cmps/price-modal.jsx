import { utilService } from '../services/util.service'
import Slider from 'rc-slider'
export function PriceModal(props) {

    return (
        <div className='slider'>
                <Slider range allowCross={false} defaultValue={[0, 1200]} min={0} max={1200} onChange={props.handlePriceRange} />
                <div className='flex-row-space-btw'>
                    <li>
                        ${utilService.getUsPrice(props.exploreFilterBy.minPrice)}
                    </li>
                    <li>
                        -
                    </li>
                    <li>
                        ${utilService.getUsPrice(props.exploreFilterBy.maxPrice)}
                    </li>
                </div>
            </div>
    )
}