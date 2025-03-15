import select from "../../../components/@common/select.js";
import { SORTING_FILTER_OPTIONS } from "../../../constants/options.js";
import { $ } from "../../../utils/domHelpers.js";
import updateRestaurantList from "./restaurantList.js";

const sortingFilter = () => {
  const $sortingSelect = select({
    options: SORTING_FILTER_OPTIONS,
    id: "sorting-filter",
  });

  $(".restaurant-filter-container").appendChild($sortingSelect);

  $sortingSelect.addEventListener("change", (event) => {
    const isFavoriteTab = $(".favorite-restaurant-tab").classList.contains(
      "select-tab-button"
    );
    updateRestaurantList(isFavoriteTab);
  });
};

export default sortingFilter;
