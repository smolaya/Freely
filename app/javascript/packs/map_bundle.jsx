import ReactOnRails from 'react-on-rails';
import Cards from '../bundles/Cards/components/Cards';
import 'babel-polyfill';
import Map from '../bundles/Map/components/Map';
import CardsList from '../bundles/Cards/components/CardsList';

// This is how react_on_rails can see the Map in the browser.
ReactOnRails.register({
  Map, CardsList, Cards
});
