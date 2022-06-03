export function ReservationConfirmed(reservation) {
    return (dispatch) => {
        dispatch({ type: 'SET_RESERVATION', reservation })
    }
}