import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import dateFns from 'date-fns'
import Form from './Form'

const CalendarModal = props => (
  <Modal isOpen={props.modalOpen} toggle={props.closeModal}>
    <ModalHeader toggle={props.closeModal}>
      { dateFns.format(props.selectedDate, 'dddd, MMMM Do') }
    </ModalHeader>
    <ModalBody>
      <ul>
        {
          props.dailyTasks.map(event => {
            return(
              <li key={event.id}>
              </li>
            )
          })
        }
      </ul>
      {
        props.dailyTasks.length === 0 &&
        <p><i>No events today</i></p>
      }
    </ModalBody>
    <ModalFooter>
      <Form
        event={props.event}
        handleDescriptionChange={props.handleDescriptionChange}
        handleFormSubmit={props.handleFormSubmit}
      />
    </ModalFooter>
  </Modal>
)

export default CalendarModal
