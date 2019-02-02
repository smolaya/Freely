import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import dateFns from 'date-fns'

const CalendarModal = props => (
  <Modal isOpen={props.modalOpen} toggle={props.closeModal}>
    <ModalHeader toggle={props.closeModal}>
      { dateFns.format(props.selectedDate, 'dddd, MMMM Do') }
    </ModalHeader>
    <ModalBody>
      <ul>
        {
          props.dailyEvents.map((event) => {
            return(
              <li key={event.id}>
                {event.description}
              </li>
            )
          })
        }
      </ul>
      {
        props.dailyEvents.length === 0 &&
        <p><i>No events today</i></p>
      }
    </ModalBody>
    <ModalFooter>
      
    </ModalFooter>
  </Modal>
)

export default CalendarModal
