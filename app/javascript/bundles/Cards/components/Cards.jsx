import React from 'react'
import axios from 'axios'
import { Grid, Card } from 'semantic-ui-react';

export default class Cards extends React.Component {
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
      console.log({data})
    }).catch(err => console.log(err))
  }

  makeCards = () => {
    this.state.map((cards, index) => {
      return 
    })
  }  

  render() {
    return (
     
      <div>
        <p>Map coordinates</p>
        <button className="submitbutton" onClick={this.onSubmit}>Submit</button>
        <button className="submitbutton" onClick={this.makeCards}>MakeCards</button>
        <p>{this.state.cards["name"]}</p>
      </div>
      
    )
  }
}