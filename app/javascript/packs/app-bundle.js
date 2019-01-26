import ReactOnRails from 'react-on-rails';
import Calendar from '../bundles/Calendar/components/Calendar';
import Map from '../bundles/Map/components/Map'

// This is how react_on_rails can see the Components in the browser.
ReactOnRails.register({ Calendar });
ReactOnRails.register({ Map });
