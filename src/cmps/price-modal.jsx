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
        plugins: {
            legend: {
                // position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    }

    const labels = ['200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200']
    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: [7, 8, 9,10,9,3,5,6,7,8,9,3,2.5,7,7,7,7,7,7,7,7],
                backgroundColor: 'rgb(176, 176, 176)',
            },
        ],
    };

    console.log(props.stays)

    return (
        <div className='slider'>
            <Bar options={options} data={data} />
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