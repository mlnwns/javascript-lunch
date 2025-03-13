import { $ } from "../utils/domHelpers";
import { getStorage } from "../utils/storage";
import restaurantList, {
  replaceRestaurantList,
} from "../views/mainPage/components/restaurantList";

const sortingFilterHandler = (event) => {
  const selectSorting = event.target.value;
  const list = getStorage("restaurants");
  const sortedList = list.sort((a, b) => {
    if (selectSorting === "name") {
      return a.title.localeCompare(b.title);
    }
    if (selectSorting === "distance") {
      return a.distance - b.distance;
    }
  });

  replaceRestaurantList(sortedList);
};

export default sortingFilterHandler;
