import { Restaurant } from "../types/type.ts";
import { getStorage, setStorage } from "../utils/storage.ts";

const toggleFavorite = (event: MouseEvent) => {
  event.stopPropagation();

  const $icon = event.target as HTMLImageElement;
  const restaurantId = $icon.dataset.id;

  let restaurants: Restaurant[] = getStorage("restaurants") ?? [];

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
