import React from 'react';
import axios from 'axios';
import { Grid, Card } from 'semantic-ui-react';
import Cards from './Cards';

const token = document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute('content')

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': token
  }

export default class CardsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cards: [],
      events: [],
    }
  }

  async componentDidMount() {
    let { events } = this.state
    const { data } = await axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=25.8014116&location.longitude=-80.1990871&location.within=25km&expand=venue,category&token=N3UJC5A67XVRFFOQQBCG`)
    events = data.events.map(event => ({
      name: event.name.text,
      street: event.venue.address.address_1,
      city: event.venue.address.city,
      state: event.venue.address.region,
      longitude: event.venue.longitude,
      latitude: event.venue.latitude
    }))
    events.forEach(async (event) => {
      await axios.post(
        '/places',
        event,
        headers: headers,
      )
    })
    this.setState({ cards: data.events, events })
  }

  render() {
    return (
        <div>
          <Grid columns='equal' centered>
            {
              this.state.cards.map((eventcard, index) => {
                return <Cards key={index} eventcard={eventcard} />
              })
            }
          </Grid>
        </div>
    )
  }
}
