import { getStorage, setStorage } from "../utils/storage.ts";

const toggleFavorite = (event) => {
  event.stopPropagation();
  const $icon = event.target;
  const restaurantId = $icon.dataset.id;
  let restaurants = getStorage("restaurants");

  restaurants = restaurants.map((restaurant) => {
    if (restaurant.id === restaurantId) {
      return { ...restaurant, isFavorite: !restaurant.isFavorite };
    }
    return restaurant;
  });

  setStorage("restaurants", restaurants);

  if ($icon.classList.contains("favorite-icon")) {
    if ($icon.src.includes("/favorite-icon-filled.png")) {
      $icon.src = "/favorite-icon-lined.png";
    } else {
      $icon.src = "/favorite-icon-filled.png";
    }
  }
};

export default toggleFavorite;
