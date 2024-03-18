import RestaurantListStorageService from '../../services/restaurantListStorageService';
import Header from '../header/Header';
import Modal from '../modal/Modal';
import RestaurantList from '../restaurantList/RestaurantList';
import { mountFilterBarComponent } from '../restaurantTab/renderHandlers';
import RestaurantTab from '../restaurantTab/RestaurantTab';
import ApplicationMain from './applicationMain/ApplicationMain';
import RestaurantListFilterService from '../../services/restaurantListFilterService';
import localStorageHandler from '../../services/localStorageHandler';

const allData = localStorageHandler('restaurantList').get()!;
const filterData = RestaurantListFilterService.getFilteredData(allData);

function App() {
  Modal();
  Header();
  RestaurantTab();
  ApplicationMain();
  mountFilterBarComponent(filterData);
  RestaurantList(filterData);
}

export default App;
