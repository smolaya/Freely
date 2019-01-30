import React from 'react';
import axios from 'axios';
import Search from './Search';

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': ReactOnRails.authenticityToken()
}

class Results extends React.Component {
  state = {
    street: String(),
    city: String(),
    state: String(),
    zipcode: String(),
  }

  handleSearchChange = field => e => this.setState({[field]: e.target.value})

  onSubmit = async e => {
    e.preventDefault();
    const { street, city, state, zip} = this.state
    const resultData = { street, city, state, zip}
    await axios.post(
      '/results',
      resultData,
      headers: headers
    )
    this.setState({
      street: String(),
      city: String(),
      state: String(),
      zipcode: String(),
    })
    Turbolinks.visit('/gallery')
  }

  render() {
    const { street, city, state, zip } = this.state

    return (
      <div className="searchContent">
        <form className="searchForm" onSubmit={this.onSubmit}>
          <input
            placeholder= "Street"
            className="searchInput"
            type="text"
            name="street"
            value={street}
            onChange={this.handleSearchChange('street')} />
          <input
            placeholder= "City"
            className="searchInput"
            type="text"
            name="city"
            value={city}
            onChange={this.handleSearchChange('city')} />
          <input
            placeholder= "State"
            className="searchInput"
            type="text"
            name="State"
            value={state}
            onChange={this.handleSearchChange('state')} />
          <input
            placeholder= "Zipcode"
            className="searchInput"
            type="text"
            name="Zipcode"
            value={zip}
            onChange={this.handleSearchChange('zip')} />
          <div className="buttons">
              <button className="submitbutton">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Results;
