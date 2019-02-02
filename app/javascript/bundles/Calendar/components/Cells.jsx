import React from 'react'
import dateFns from 'date-fns'
import Cell from './Cell'

const Cells = props => {
  const monthStart  = dateFns.startOfMonth(props.currentMonth)
  const monthEnd    = dateFns.endOfMonth(monthStart)
  const startDate   = dateFns.startOfWeek(monthStart)
  const endDate     = dateFns.endOfWeek(monthEnd)
  const rows        = []
  let days          = []
  let day           = startDate
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(day)
      let dailyEvents =  props.dailyEvents[dateFns.format(newDate, "YYYY-MM-DD")]
      days.push(<Cell key={day} day={day} {...props} dailyEvents={dailyEvents} />)
      day = dateFns.addDays(day, 1)
    }
    rows.push(
      <div className="calendar-row" key={day}>
        {days}
      </div>
    )
    days = []
  }
  return <div className="body">{rows}</div>
}

export default Cells
