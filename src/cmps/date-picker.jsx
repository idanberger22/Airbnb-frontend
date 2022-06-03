import React, { Component } from "react"
import { DateRangePicker } from "react-dates"
import moment from "moment";
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'


export class DateRangeSelector extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null
  }

  componentDidMount() {
    this.setState({ ...this.state, endDate: this.props.endDate, startDate: this.props.startDate })
  }

  handleDateChange = ({ startDate, endDate }) => {
    if (this.props.place === 'filter') this.setState({ startDate, endDate }, () => this.props.handleDate({ startDate, endDate }))
    else this.setState({ startDate, endDate }, () => this.props.setDatesAndPrice(startDate, endDate))
  }

  handleFocusChange = (focusedInput) => this.setState({ focusedInput })

  render = () => {
    return <section className="date-range-selector">
      <DateRangePicker
        startDatePlaceholderText={'check-in'}
        endDatePlaceholderText={'check-out'}
        noBorder={true}
        endDate={this.state.endDate}
        endDateId="endDate"
        focusedInput={this.state.focusedInput}
        onDatesChange={this.handleDateChange}
        onFocusChange={this.handleFocusChange}
        startDate={this.state.startDate}
        startDateId="startDate"
      />
    </section>
  }
}