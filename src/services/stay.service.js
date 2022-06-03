import { dataService } from './stay.data.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STAY_KEY = 'stay'

export const stayService = {
    query,
    getById,
    getTopRated,
    getRandomStayId,
}
window.cs = stayService

async function query(filterBy, exploreFilterBy) {
    let stays = await httpService.get(STAY_KEY,filterBy)
    if (exploreFilterBy) {
        stays = stays.filter(stay => stay.price <= exploreFilterBy.maxPrice && stay.price >= exploreFilterBy.minPrice)
        if (exploreFilterBy.roomTypes) {
            const fullRoomTypes = ['Entire home/apt', 'Hotel room', 'Private room', 'Shared room']
            fullRoomTypes.forEach(type => {
                if (!exploreFilterBy.roomTypes.includes(type)) stays = stays.filter(stay => stay.roomType !== type)
            })
        }
        if (exploreFilterBy.amenities) {
            exploreFilterBy.amenities.forEach(amn => { stays = stays.filter(stay => stay.amenities.includes(amn)) })
        }
    }
    return stays
}
async function getById(stayId) {
    const stay= await httpService.get(STAY_KEY+`/${stayId}`)
    return stay
}

async function addStay(stay) {
    // const addedStay = await httpService.post('stay', stay)
    // return addedStay
}


function getTopRated() {
    return dataService.getTopRated()
}

async function getRandomStayId() {
    const stays = await httpService.get(STAY_KEY)
    const idx = utilService.getRandomIntInclusive(0, stays.length - 1)
    return stays[idx]._id
}