import select from "../../../components/@common/select.js";
import { CATEGORY_FILTER_OPTIONS } from "../../../constants/options.js";
import { $ } from "../../../utils/domHelpers.js";

const categoryFilter = () => {
  const categorySelect = select({
    id: "category-filter",
    name: "category",
    options: CATEGORY_FILTER_OPTIONS,
    className: "restaurant-filter",
  });

  $(".restaurant-filter-container").appendChild(categorySelect);
};

export default categoryFilter;
