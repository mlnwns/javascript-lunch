import { sortRestaurants } from "../../domain/sortRestaurants.ts";
import categoryFilter from "./components/categoryFilter";
import { renderRestaurantList } from "./components/restaurantList";
import sortingFilter from "./components/sortingFilter";
import tabContainer from "./components/tabContainer";
import { StorageController } from "../../utils/storage.ts";

const restaurantStorage = new StorageController("restaurants");

const renderMainPage = () => {
  const restaurants = restaurantStorage.getStorage() ?? [];
  tabContainer();
  renderRestaurantList(sortRestaurants(restaurants));
  categoryFilter();
  sortingFilter();
};

export default renderMainPage;
