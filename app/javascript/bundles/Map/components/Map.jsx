import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
<<<<<<< HEAD
=======
import {apiKey} from '../../config';
>>>>>>> a6dca5e7328c652c7fccaa7bc65f0fab2145df5c

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
      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: { 'icon-image': 'star-15', 'icon-allow-overlap': true }
      });
      map.on('click', 'places', e => {
        const { properties, geometry } = e.features[0];
        const coordinates  = geometry.coordinates.slice();
        const { name, id, description, address, start, end } = properties;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<div class="mapboxgl-popup-content">
                      <p>${name}</p>
                      <p>Start: ${start}</p>
                      <p>End: ${end}</p>
                      <p>${description}</p>
                      <p>Address: ${address}</p>
                    </div>`)
          .addTo(map)
      })
      this.fetchPlaces();
    });
    map.on('moveend', _ => this.fetchPlaces());
  }

  fetchPlaces = async _ => {
    const map = this.map
    const { lat, lng } = map.getCenter();
    const { data } = await axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=${lat}&location.longitude=${lng}&location.within=10km&expand=venue,category&token=${apiKey}`)
    const events = data.events.map(event => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [event.venue.longitude, event.venue.latitude]
        },
        properties: {
          name: event.name.text,
          description: event.description.text,
          address: event.venue.address.localized_address_display,
          start: event.start.local,
          end: event.end.local,
          id: event.id
        }
      })
    )
    const geoJson = { type: "FeatureCollection", features: events }
    map.getSource('places').setData(geoJson)
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
      width: '100vw',
      height: '500px',
      backgroundColor: 'azure'
    };
    return (
        <div style={style} ref={el => this.mapContainer = el} />
    )
  }

  componentWillUnmount() {
    this.map.remove();
  }
}
