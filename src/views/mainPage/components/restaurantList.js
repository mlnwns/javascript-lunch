import { $ } from "../../../utils/domHelpers.js";
import { getStorage } from "../../../utils/storage.js";
import { sortRestaurants } from "../../../domain/sortRestaurants.js";
import restaurantItem from "../../../components/restaurantItem.js";
import toggleFavorite from "../../../eventHandler/toggleFavorite.js";
import {
  CATEGORY_DEFAULT,
  SORTING_DEFAULT,
} from "../../../constants/options.js";

const updateRestaurantList = (isFavoriteTab = false) => {
  const restaurants = getStorage("restaurants") ?? [];

  const selectedCategory = $("#category-filter")?.value || CATEGORY_DEFAULT;
  const selectedSorting = $("#sorting-filter")?.value || SORTING_DEFAULT;

  let filteredList = restaurants;

  if (isFavoriteTab) {
    filteredList = restaurants.filter((restaurant) => restaurant.isFavorite);
  }

  if (selectedCategory !== CATEGORY_DEFAULT) {
    filteredList = restaurants.filter(
      (restaurant) => restaurant.category === selectedCategory
    );
  }

  const sortedList = sortRestaurants(filteredList, selectedSorting);

  renderRestaurantList(sortedList);
};

export const renderRestaurantList = (restaurants) => {
  const $container = $(".restaurant-list");
  $container.innerHTML = restaurants
    .map((restaurant) => restaurantItem(restaurant))
    .join("");

  document.querySelectorAll(".favorite-icon").forEach(($icon) => {
    $icon.addEventListener("click", toggleFavorite);
  });
};

export default updateRestaurantList;
