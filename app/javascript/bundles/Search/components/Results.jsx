import React from 'react';
import axios from 'axios';
import Search from './Search';

class Results extends React.Component {
  state = {
    coordinates: ""
  }

  handleSearchChange = e => {
    this.setState({coordinates: e.target.value});
  };
  onSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=${position.coords.latitude}&location.longitude=${position.coords.longitude}&location.within=25km&expand=venue,category&token=N3UJC5A67XVRFFOQQBCG`).then(({data}) => {
      this.setState({results: data})
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
      <Search onSubmit={this.onSubmit} handleSearchChange={this.handleSearchChange} />
    </div>
  );
  }
}

export default Results;
