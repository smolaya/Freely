import React from 'react'
import dateFns from 'date-fns'

const Cell = props => (
  <div
    className={`calendar-col cell ${
      !dateFns.isSameMonth(props.day, props.currentMonth)
        ? "disabled"
        : dateFns.isSameDay(props.day, props.currentDate) ? "current" : ""
    }`}
    onClick={ (e) => { props.handleDateClick(props.day) } }
  >
    <div className="calendar-events">
      {
        props.dailyEvents &&
          props.dailyEvents.map(event => {
            return(
              <div key={event.id} className="calendar-event">
                { event.description }
              </div>
            )
          })
      }
    </div>
    <span className="number">{dateFns.format(props.day, "D")}</span>
  </div>
)

export default Cell

