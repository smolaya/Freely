import React from 'react';
import axios from 'axios';
import { Grid, Card } from 'semantic-ui-react';
import Cards from './Cards';

export default class CardsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cards: []
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=25.8014116&location.longitude=-80.1990871&location.within=25km&expand=venue,category&token=N3UJC5A67XVRFFOQQBCG`).then(({data}) => {
      this.setState({cards: data})
      console.log(this.state.cards.events[0].name.text)
      console.log(this.state.cards.events[0].start.local)
      console.log(this.state.cards.events[0].end.local)
      console.log(this.state.cards.events[0].venue.address.localized_address_display)
      console.log(this.state.cards.events[0].description.text)
    }).catch(err => console.log(err))
  }

  render() {
    return (
        <div>
         <div>
            <p>Map coordinates</p>
            <button className="submitbutton" onClick={this.onSubmit}>Submit</button>
            <p>{this.state.cards["name"]}</p>
          </div>
          <div>
            <Grid columns='equal' centered>
              {this.state.cards.map((eventcard, index) => {
                return <Cards key={index} eventcard={eventcard} />
              })    
              } 
            </Grid>
          </div> 
        </div>         
    )     
  }
} 
