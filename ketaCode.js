// Reservation.service
async function addReservation(reservation) {
    const addedReservation = await httpService.post('reservation', reservation)
    socketService.emit('new-reservation', { hostId: addedReservation.hostId, guestName: addedReservation.user.fullName })

    return addedReservation
}


// Backend
socket.on('new-reservation', ({ hostId, guestName }) => {
    gIo.to(hostId).emit('rereservation-added', { guestName })
})


// UserMsg Component
function componentDidMount() {
    socketService.on('rereservation-added', (data) => {
        const msg = `New reservation from ${data.guestName}`

        this.setState({ msg })
        setTimeout(() => {
            this.setState({ msg: null })
        }, 2500)

    })
}

function componentWillUnmount(){
    socketService.off('rereservation-added')
}