import { ALL_CATEGORY, SORT_VALUE } from "../constants/system";
import filterState from "../store/FilterStateStore";
import { Iall, Icategory } from "../types/category";
import { Irestaurant, IrestaurantList } from "../types/restaurant";
import { IsortType } from "../types/sort";

class RestaurantListHelper implements IrestaurantList {
  sortBySelectedValue(seletedValue: IsortType, restaurantList: Irestaurant[]) {
    if (seletedValue === SORT_VALUE.BYNAME)
      return this.sortByName(restaurantList);

    return this.sortByDistance(restaurantList);
  }

  sortByName(restaurantList: Irestaurant[]) {
    return restaurantList.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Irestaurant[]) {
    return restaurantList.sort((a, b) => {
      if (a.distance === b.distance) {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
  }

  filterByCategory(category: Icategory | Iall, restaurantList: Irestaurant[]) {
    if (category === ALL_CATEGORY) {
      return restaurantList;
    }

    return restaurantList.filter(
      (restaurant) => restaurant.category === category,
    );
  }

  filterByLiked(liked: boolean, restaurantList: Irestaurant[]) {
    if (liked === true)
      return restaurantList.filter((restaurant) => restaurant.isLike);
    return restaurantList;
  }

  allFilteredData(restaurantList: Irestaurant[]) {
    const filteredBarData = this.sortBySelectedValue(
      filterState.getFilterInfo().sort,
      this.filterByCategory(filterState.getFilterInfo().filter, restaurantList),
    );
    return this.filterByLiked(
      filterState.getFilterInfo().liked,
      filteredBarData,
    );
  }
}

const restaurantListHelper = new RestaurantListHelper();

export default restaurantListHelper;
