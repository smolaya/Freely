import ReactOnRails from 'react-on-rails';
import Calendar from '../bundles/Calendar/components/Calendar';
import Map from '../bundles/Map/components/Map'
import Results from '../bundles/Search/components/Results'
import CardsList from '../bundles/Cards/components/CardsList'
import 'babel-polyfill';

// This is how react_on_rails can see the Components in the browser.
ReactOnRails.register({ Calendar, Map, CardsList, Results });
