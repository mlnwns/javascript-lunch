import { $ } from "../../../utils/domHelpers.js";
import restaurantItem from "../../../components/restaurantItem.js";
import { restaurants } from "../../../mock-data/restaurantData.js";

const restaurantList = () => {
  const $restaurantContainer = $(".restaurant-list");

  $restaurantContainer.innerHTML = restaurants
    .map((restaurant) => restaurantItem(restaurant))
    .join("");
};

export default restaurantList;
