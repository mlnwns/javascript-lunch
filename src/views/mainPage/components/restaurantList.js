import { $ } from "../../../utils/domHelpers.js";
import restaurantItem from "../../../components/restaurantItem.js";
import toggleFavorite from "../../../eventHandler/toggleFavorite.js";
import { getStorage } from "../../../utils/storage.js";

const restaurantList = (restaurants) => {
  const $restaurantContainer = $(".restaurant-list");

  $restaurantContainer.innerHTML = restaurants
    .map((restaurant) => restaurantItem(restaurant))
    .join("");

  const $favoriteIcons = document.querySelectorAll(".favorite-icon");
  $favoriteIcons.forEach(($icon) => {
    $icon.addEventListener("click", toggleFavorite);
  });
};

export const replaceRestaurantList = (list) => {
  $(".restaurant-list").replaceChildren();
  restaurantList(list);
};

export default restaurantList;
