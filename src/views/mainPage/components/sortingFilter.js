import select from "../../../components/@common/select.js";
import { SORTING_FILTER_OPTIONS } from "../../../constants/options.js";
import { $ } from "../../../utils/domHelpers.js";

const sortingFilter = () => {
  const sortingSelect = select({
    id: "sorting-filter",
    name: "sorting",
    options: SORTING_FILTER_OPTIONS,
    className: "restaurant-filter",
  });

  $(".restaurant-filter-container").appendChild(sortingSelect);
};

export default sortingFilter;
