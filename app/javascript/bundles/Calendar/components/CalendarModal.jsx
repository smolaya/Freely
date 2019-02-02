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
                <ul key={event.id}>
                  <li>Name: {event.name}</li>
                  <li>Description: {event.description}</li>
                  <li>Start Time: {event.datetime_start}</li>
                  <li>End Time: {event.datetime_end}</li>
                  <li>Location: {event.address}</li>
                </ul>  
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
