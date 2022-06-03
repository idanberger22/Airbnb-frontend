import { Trips } from "../pages/trips"

const KEY = 'orderDB'

export const tripsService = {
    query,
    addTrip

}
function  query() {
    let trips = JSON.parse(localStorage.getItem(KEY))
    if(!trips) return []
    return trips
}

function addTrip(trip) {
    let trips = localStorage.getItem(KEY)
    if(!trips) {
        localStorage.setItem(KEY , JSON.stringify([trip]))
        return;
    }
    trips = JSON.parse(trips);
    trips = [...trips, trip]
    localStorage.setItem(KEY , JSON.stringify(trips))
}