import React, { Component } from 'react'
import dateFns from 'date-fns'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import CalendarModal from './CalendarModal'

export default class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    currentDate:  new Date(),
    events: [],
    selectedDate: new Date,
    modalOpen:    false,
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
  }

  handleDateClick = day => {
    this.setState({ selectedDate: day, modalOpen: true })
  }
 
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  componentDidMount = e => {
    let today = new Date()
    let monthStartDate = dateFns.startOfMonth(today)
    let monthEndDate = dateFns.endOfMonth(today)
    fetch(`/calendar.json?start_date=${monthStartDate}&end_date=${monthEndDate}`)
      .then( res => res.json() )
      .then( data => this.setState({ events: data }))
  }

  render(){
    const { currentMonth, currentDate, events, modalOpen, selectedDate } = this.state
    return(
      <div className="calendar">
        <Header
          currentMonth={currentMonth}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
        />
        <Days />
        <Cells
          currentMonth={currentMonth}
          currentDate={currentDate}
          dailyEvents={events}
          handleDateClick={this.handleDateClick}
        />
        <CalendarModal
          modalOpen={modalOpen}
          selectedDate={selectedDate}
          closeModal={this.closeModal}
          events={events}
          dailyEvents={ events[dateFns.format(selectedDate, 'YYYY-MM-DD')] || [] }
        />
      </div>
    )
  }
}
