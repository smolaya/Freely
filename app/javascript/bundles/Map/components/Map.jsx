import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapForm from './MapForm';
import axios from 'axios'

const token = document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute('content')

export const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': token
}

export default class Map extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbWdvbnphbGV6IiwiYSI6ImNqcmNrajV3bDFkaWU0M3A4eHlrdWx3YWsifQ.sRbIZiiJLNorVGwSO-AZmA';
    let { coordinates } = this.props;
    const mapOptions = {
      container: this.mapContainer,
      style: 'mapbox://styles/anamgonzalez/cjrckkrzs4dk22sqligcocble',
      zoom: 12,
      center: coordinates
    };
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 27000
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        // success callback
        (position) => {
          coordinates = [position.coords.longitude, position.coords.latitude]
          console.log(coordinates)
          mapOptions.center = coordinates
          this.createMap(mapOptions);
        },
        // failure callback
        () => { this.createMap(mapOptions); },
        // options
        geolocationOptions
      );
    }else{
      this.createMap(mapOptions);
    }
  }

  createMap = mapOptions => {
    this.map = new mapboxgl.Map(mapOptions);
    const map = this.map;
    map.on('load', event => {
      map.addSource(
        'places',
        {
          type: 'geojson',
          data: `/places.json`
        }
      );
      map.addLayer({ id: 'places', type: 'circle', source: 'places'});
      map.on('click', 'places', e => {
        const { properties, geometry } = e.features[0];
        const coordinates  = geometry.coordinates.slice();
        const { name, id } = properties;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<div>${name}</div>`)
          .addTo(map)
      })
    });
    map.on('moveend', _ => this.fetchPlaces());
  }

  fetchPlaces = async _ => {
    const map = this.map
    const { lat, lng } = map.getCenter();
    const { data, data: { features } } = await axios.get('/places.json');
    map.getSource('places').setData(data)
  }


  createPlace = async p => {
    await axios.post(
      '/place',
      { place: { ...p} },
      { headers: headers }
    )
  }

  render() {
    const style = {
      width: '100%',
      height: '500px',
      backgroundColor: 'azure'
    };
    return (
      <div>
        <div style={style} ref={el => this.mapContainer = el} />;
        <MapForm createPlace={this.createPlace} />
      </div>
    )
  }

  componentWillUnmount() {
    this.map.remove();
  }
}
