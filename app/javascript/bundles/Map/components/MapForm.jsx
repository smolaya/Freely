import React, { Component } from 'react';

class MapForm extends Component {
  state = {
    name: String(),
    street: String(),
    city: String(),
    state: String(),
  }
  handleInputChange = field => e => this.setState({ [field]: e.target.value })
  handleSubmit = e => {
    e.preventDefault()
    const { name, street, city, state } = this.State
    const { createPlace } = this.props
    createPlace({ name, street, city, state })
    this.setState({
      name: String(),
      street: String(),
      city: String(),
      state: String(),
    })
  }
  render(){
    const { name, street, city, state } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="mapsearch">
        <h3 className="createanewplace"> Create a new place: </h3>
        <input className="mapname"
          type ='text'
          value ={name}
          placeholder='Please input a name'
          onChange={this.handleInputChange('name')}
          label='Name'/>
        <input className="mapstreet"
          type ='text'
          value ={street}
          placeholder='Please input a street'
          onChange={this.handleInputChange('street')}
          label='Street'/>
        <input className="mapcity"
          type ='text'
          value ={city}
          placeholder='Please input a city'
          onChange={this.handleInputChange('city')}
          label='City'/>
        <input className="mapstate"
          type ='text'
          value ={state}
          placeholder='Please input a state'
          onChange={this.handleInputChange('state')}
          label='State'/>
        <input className="mapsubmit"
          type='submit'
          value='Create'/>
        </form>
    )
  }
}

export default MapForm;
