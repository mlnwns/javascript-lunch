import select from "../../../components/@common/select.js";
import { CATEGORY_FILTER_OPTIONS } from "../../../constants/options.js";
import updateRestaurantList from "./restaurantList.js";
import { $ } from "../../../utils/domHelpers.js";

const categoryFilter = () => {
  const $categorySelect = select({
    id: "category-filter",
    options: CATEGORY_FILTER_OPTIONS,
  });

  $(".restaurant-filter-container").appendChild($categorySelect);

  $categorySelect.addEventListener("change", (event) => {
    const isFavoriteTab = $(".favorite-restaurant-tab").classList.contains(
      "select-tab-button"
    );
    updateRestaurantList(isFavoriteTab);
  });
};

export default categoryFilter;
