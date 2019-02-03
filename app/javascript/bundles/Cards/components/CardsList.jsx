import React from 'react';
import axios from 'axios';
import { Grid, Card } from 'semantic-ui-react';
import Cards from './Cards';
import Carousel from 'nuka-carousel'

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': ReactOnRails.authenticityToken()
}

export default class CardsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cards: [],
      zip: this.props.zip || ''
    }
  }

  async componentDidMount() {
    const { zip } = this.state
    this.fetchEvents(zip)
  }

  fetchEvents = (zip) => {
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 27000
    };
    if(zip.length){
      axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.address=${zip}&location.within=10km&expand=venue,category&token=N3UJC5A67XVRFFOQQBCG`)
        .then(response => {
          this.setState({ cards: response.data.events, zip })
        })
    }else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        // success callback
        (position) => {
          axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=${position.coords.latitude}&location.longitude=${position.coords.longitude}&location.within=10km&expand=venue,category&token=N3UJC5A67XVRFFOQQBCG`)
            .then(response => {
              this.setState({ cards: response.data.events })
            })
        },
        // failure callback
        () => { console.log('Oops') },
        // options
        geolocationOptions
      );
    }
  }

  render() {
    const { cards, slideIndex } = this.state
    return (
        <div>
          {
            cards.length &&
            (<Carousel
              slideIndex={slideIndex}
              afterSlide={slideIndex => this.setState({ slideIndex })}>
          {
              cards.map((eventcard, index) => {
                return <Cards key={index} eventcard={eventcard} />
              })
            }
          </Carousel>)
        }
        </div>
    )
  }
}
