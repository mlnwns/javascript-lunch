import { sortRestaurants } from "../../domain/sortRestaurants.ts";
import { StorageController } from "../../utils/storage.ts";
import sortingFilter from "./components/filters/sortingFilter.js";
import categoryFilter from "./components/filters/categoryFilter.js";
import tabContainer from "./components/navigation/tabContainer.js";
import { renderRestaurantList } from "./components/display/restaurantList.js";

const restaurantStorage = new StorageController("restaurants");

const renderMainPage = () => {
  const restaurants = restaurantStorage.getStorage() ?? [];
  tabContainer();
  renderRestaurantList(sortRestaurants(restaurants));
  categoryFilter();
  sortingFilter();
};

export default renderMainPage;
