import { $ } from "../../../utils/domHelpers.js";
import restaurantItem from "../../../components/restaurantItem.js";
import toggleFavorite from "../../../eventHandler/toggleFavorite.js";
import { getStorage } from "../../../utils/storage.js";

const restaurantList = () => {
  const $restaurantContainer = $(".restaurant-list");

  const restaurants = getStorage("restaurants");

  $restaurantContainer.innerHTML = restaurants
    .map((restaurant) => restaurantItem(restaurant))
    .join("");

  const $favoriteIcons = document.querySelectorAll(".favorite-icon");
  $favoriteIcons.forEach(($icon) => {
    $icon.addEventListener("click", toggleFavorite);
  });
};

export default restaurantList;
