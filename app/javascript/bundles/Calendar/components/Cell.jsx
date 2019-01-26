import React from 'react'
import dateFns from 'date-fns'

const Cell = props => {
  return(
    <div
      className={`calendar-col cell ${
        !dateFns.isSameMonth(props.day, props.currentMonth)
          ? "disabled"
          : dateFns.isSameDay(props.day, props.currentDate) ? "current" : ""
      }`}
    >
      <span className="number">{dateFns.format(props.day, "D")}</span>
    </div>
  )
}

export default Cell
