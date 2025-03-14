import { sortRestaurants } from "../../domain/sortRestaurants";
import { getStorage } from "../../utils/storage";
import categoryFilter from "./components/categoryFilter";
import { renderRestaurantList } from "./components/restaurantList";
import sortingFilter from "./components/sortingFilter";
import tabContainer from "./components/tabContainer";

const renderMainPage = () => {
  const restaurants = getStorage("restaurants") ?? [];
  tabContainer();
  renderRestaurantList(sortRestaurants(restaurants));
  categoryFilter();
  sortingFilter();
};

export default renderMainPage;
