import React from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';
import csrfHeaders from '../../shared/csrfHeaders.jsx'
import axios from 'axios';
import Carousel from 'nuka-carousel'

class Cards extends React.Component {

  addEvent = e => {
    let event = {
      name: this.props.eventcard.name.text,
      address: this.props.eventcard.venue.address.localized_address_display,
      datetime_start: this.props.eventcard.start.local,
      datetime_end: this.props.eventcard.end.local,
      description: this.props.eventcard.description.text,
      category: this.props.eventcard.category.name
    }

    // let formData = new FormData()
    // for (let item in event){
    //   formData.append( `event[${item}]`, event[item]  )
    // }

    axios.post('/events.json', { event }, { headers: csrfHeaders } )
      .then( response => Turbolinks.visit(`/calendar`) )
      .catch( err => console.log( err ) )
  }

    render(){
      return (
        <div id ='event-card-name'>
          {this.props.eventcard.name.text}
        {// <Carousel slidesToShow={3} cellAlign="center">
        //       <Card>
        //         <Card.Content>
        //           <Card.Header>{this.props.eventcard.name.text}</Card.Header>
        //           <Card.Meta>
        //             Start time: {this.props.eventcard.start.local} <br />
        //             End time: {this.props.eventcard.end.local}<br />
        //             Address: {this.props.eventcard.venue.address.localized_address_display}<br />
        //           </Card.Meta>
        //           <Card.Description>{this.props.eventcard.description.text}</Card.Description>
        //         </Card.Content>
        //         <Button onClick={this.addEvent}>Add to My Calendar</Button>
        //       </Card>
        // </Carousel>
      }
        </div>
      );
    }
}
export default Cards
