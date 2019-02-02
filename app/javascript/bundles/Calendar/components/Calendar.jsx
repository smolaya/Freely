import React, { Component } from 'react'
import dateFns from 'date-fns'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'

export default class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    currentDate:  new Date(),
    events: []
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
  componentDidMount = e => {
    let today = new Date()
    let monthStartDate = dateFns.startOfMonth(today)
    let monthEndDate = dateFns.endOfMonth(today)
    fetch(`/calendar.json?start_date=${monthStartDate}&end_date=${monthEndDate}`)
      .then( res => res.json() )
      .then( data => this.setState({ events: data }))
  }

  render(){
    const { currentMonth, currentDate, events } = this.state
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
        />
      </div>
    )
  }
}
