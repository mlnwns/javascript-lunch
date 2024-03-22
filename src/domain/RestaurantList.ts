import { CATEGORY_WITH_ENTIRE } from "../constants/selectOptions";
import sortLetters from "../utils/sortLetters";

class RestaurantList {
  #restaurants: Map<string, Restaurant> = new Map();
  #sortCallback: Record<
    SortStandard,
    (a: Restaurant, b: Restaurant) => number
  > = {
    이름순: (a: Restaurant, b: Restaurant) => sortLetters(a.name, b.name),
    거리순: (a: Restaurant, b: Restaurant) => a.distance - b.distance,
  };

  constructor(restaurants: Restaurant[] = []) {
    this.init(restaurants);
  }

  init(restaurants: Restaurant[] = []) {
    const restaurantEntries: [string, Restaurant][] = restaurants.map(
      (restaurant) => [restaurant.name, restaurant]
    );
    this.#restaurants = new Map(restaurantEntries);
  }

  add(restaurant: Restaurant) {
    this.#restaurants.set(restaurant.name, restaurant);

    return this;
  }

  delete(name: string) {
    if (this.#restaurants.get(name) === undefined) {
      throw new Error(
        "[ERROR_IN_RestaurantList_delete()] restaurants 필드에서 restaurant name을 찾을 수 없어 삭제할 음식점을 삭제할 수 없습니다."
      );
    }
    this.#restaurants.delete(name);
  }

  bringRestaurantInfo(name: string) {
    if (this.#restaurants.get(name) === undefined) {
      throw new Error(
        "[ERROR_IN_RestaurantList_bringRestaurantInfo()] restaurants 필드에서  restaurant name을 찾을 수 없어 음식점 정보를 가져올 수 없습니다."
      );
    }
    return this.#restaurants.get(name);
  }

  updateFavorites(name: string) {
    const restaurantValue = this.#restaurants.get(name);

    if (!restaurantValue) {
      throw new Error(
        "[ERROR_IN_RestaurantList_updateFavorites()] restaurants 필드에서 restaurant name을 찾을 수 없어 음식점의 favorites 을 변경할 수 없습니다."
      );
    }

    const favoritesState = restaurantValue.favorites;
    const newRestaurantValue = {
      ...restaurantValue,
      favorites: !favoritesState,
    };

    this.#restaurants.set(name, newRestaurantValue);
  }

  convertedRestaurants() {
    return Array.from(this.#restaurants.values());
  }

  withFavorites() {
    const restaurants = this.convertedRestaurants();
    return restaurants.filter((restaurant) => restaurant.favorites === true);
  }

  getOrderedRestaurant({
    category,
    sortStandard,
  }: {
    category: CategoryWithEntire;
    sortStandard: SortStandard;
  }) {
    const filteredRestaurant = this.#filterByCategory(category);
    filteredRestaurant.sort(this.#sortCallback[sortStandard]);

    return filteredRestaurant;
  }

  #filterByCategory(category: CategoryWithEntire) {
    const restaurants = this.convertedRestaurants();
    if (category === CATEGORY_WITH_ENTIRE[0]) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }
}

export default RestaurantList;
