import { $ } from "../utils/domHelpers";
import { getStorage } from "../utils/storage";
import restaurantList, {
  replaceRestaurantList,
} from "../views/mainPage/components/restaurantList";

const categoryFilterHandler = (event) => {
  const selectCategory = event.target.value;
  const list = getStorage("restaurants");
  if (selectCategory === "all") {
    replaceRestaurantList(list);

    return;
  }
  const filteredList = list.filter(
    ({ category }) => category === selectCategory
  );
  replaceRestaurantList(filteredList);
};

export default categoryFilterHandler;
