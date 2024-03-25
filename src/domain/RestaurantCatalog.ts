import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';
import Restaurant, { IRestaurantInfo, ICategory } from './Restaurant';

export const CATEGORY_ALL = '전체';

export type TSortCondition = '이름순' | '거리순';

export const SORT_CONDITION: readonly TSortCondition[] = Object.freeze(['이름순', '거리순']);

class RestaurantCatalog {
  #restaurants: Restaurant[] = [];

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    this.#restaurants.forEach((restaurant: Restaurant) => {
      if (restaurant.getInfo().name === restaurantInfo.name) {
        throw new Error(`${ERROR_PREFIX} ${RESTAURANT_ERROR_MESSAGES.DUPLICATE_NAME}`);
      }
    });

    const newRestaurant = new Restaurant(restaurantInfo);
    this.#restaurants.push(newRestaurant);
  }

  removeRestaurant(restaurantInfo: IRestaurantInfo) {
    this.#restaurants.forEach((restaurant: Restaurant, idx: number) => {
      if (restaurant.getInfo().name === restaurantInfo.name) {
        this.#restaurants.splice(idx, 1);
      }
    });
  }

  updateRestaurant(restaurantName: string, isFavorite: boolean) {
    this.#restaurants.forEach((restaurant: Restaurant, idx: number) => {
      const restaurantInfo = restaurant.getInfo();
      if (restaurantInfo.name === restaurantName && restaurantInfo.isFavorite === isFavorite) {
        const prev = restaurant.getInfo();
        prev.isFavorite = !isFavorite;

        const newRestaurant = new Restaurant(prev);
        this.#restaurants[idx] = newRestaurant;
      }
    });
  }

  static filterByCategory(restaurants: IRestaurantInfo[], category: ICategory) {
    if (category === CATEGORY_ALL) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  static sortByName(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.name < restaurantCurrent.name) return -1;
      return 1;
    });
  }

  static sortByDistance(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.distanceFromCampus !== restaurantCurrent.distanceFromCampus) {
        return restaurantPrev.distanceFromCampus - restaurantCurrent.distanceFromCampus;
      }
      return restaurantPrev.name.localeCompare(restaurantCurrent.name);
    });
  }

  getTotalRestaurantInfo() {
    return this.#restaurants.map((res) => res.getInfo());
  }
}

export default RestaurantCatalog;
