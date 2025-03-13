import { sortRestaurants } from "../../domain/sortRestaurants";
import { getStorage } from "../../utils/storage";
import categoryFilter from "./components/categoryFilter";
import restaurantList from "./components/restaurantList";
import sortingFilter from "./components/sortingFilter";

const renderMainPage = () => {
  const restaurants = getStorage("restaurants") ?? [];

  restaurantList(sortRestaurants(restaurants));
  categoryFilter();
  sortingFilter();
};

export default renderMainPage;
