import select from "../../../../components/@common/select";
import { SORTING_FILTER_OPTIONS } from "../../../../constants/options";
import { $ } from "../../../../utils/domHelpers";
import updateRestaurantList from "../display/restaurantList";

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
