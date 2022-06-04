import { utilService } from '../services/util.service'
import Slider from 'rc-slider'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

export function PriceModal(props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Stays per price range',
            },
        },
    }

    const labels = ['', '', '', '', '', '', '', '', '', '', '','']
    const stays = props.stays
    let dataToDisplay = [0,0,0,0,0,0,0,0,0,0,0]
    stays.forEach(stay=>{
        if(stay.price<=200) dataToDisplay[0]++
        else if(stay.price>1200) dataToDisplay[dataToDisplay.length-1]++
        else dataToDisplay[Math.floor(stay.price/100)-1]++
    })

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: dataToDisplay,
                backgroundColor: 'rgb(176, 176, 176)',
            },
        ],
    }

    return (
        <div className='slider'>
            <div>
                <Bar options={options} data={data} height='180px' />
            </div>
            <Slider range allowCross={false} defaultValue={[0, 1200]} min={0} max={1200} onChange={props.handlePriceRange} />
            <div className='flex-row-space-btw'>
                <li>
                    ${utilService.getUsPrice(props.exploreFilterBy.minPrice)}
                </li>
                <li>
                    -
                </li>
                <li>
                    ${utilService.getUsPrice(props.exploreFilterBy.maxPrice)}{props.exploreFilterBy.maxPrice===1200 && <span>+</span>}
                </li>
            </div>
        </div>
    )
}