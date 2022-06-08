import React from 'react'

import { eventBusService } from '../services/event-bus.service.js'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service.js'
export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(()=>{
        this.setState({ msg : null })
      }, 2500)
    })
    
    socketService.on(SOCKET_EVENT_REVIEW_ADDED, (data) => {
      console.log('GOT from socket' )
      const msg=`New reservation from ${data.guestName}`
      this.setState({ msg })
      setTimeout(()=>{
        this.setState({ msg : null })
      }, 2500)
      
    })
  }
  
  componentWillUnmount() {
    socketService.off(SOCKET_EVENT_REVIEW_ADDED)
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <span></span>
    const msgClass = this.state.msg.type || ''
    // 
    return (
      <section className={'user-msg success'}>
        <h1>{this.state.msg}</h1>
      </section>
    )
  }
}
