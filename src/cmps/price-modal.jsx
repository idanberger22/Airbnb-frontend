import { utilService } from '../services/util.service'
import Slider from 'rc-slider'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'


export function PriceModal(props) {
    // console.log(props.stays)
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

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [5,6,7],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

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