import React, { Component } from 'react'
import dateFns from 'date-fns'
import Header from './Header'
import Days from './Days'

export default class Calendar extends Component {
  state = {
    currentMonth: new Date()
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

  render(){
    const { currentMonth } = this.state
    return(
      <div className="calendar">
        <Header
          currentMonth={currentMonth}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
        />
        <Days />
      </div>
    )
  }
}
