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
      <form onSubmit={this.handleSubmit}>
        <h3> Create a new place </h3>
        <input
          type ='text'
          value ={name}
          placeholder='Please input a name'
          onChange={this.handleInputChange('name')}
          label='Name'/>
        <input
          type ='text'
          value ={street}
          placeholder='Please input a street'
          onChange={this.handleInputChange('street')}
          label='Street'/>
        <input
          type ='text'
          value ={city}
          placeholder='Please input a city'
          onChange={this.handleInputChange('city')}
          label='City'/>
        <input
          type ='text'
          value ={state}
          placeholder='Please input a state'
          onChange={this.handleInputChange('state')}
          label='State'/>
        <input
          type='submit'
          value='Create'/>
        </form>
    )
  }
}

export default MapForm;
