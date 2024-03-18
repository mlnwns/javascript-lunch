import { ERROR_MESSAGE } from '../constant/error';
import { Restaurant, localKey } from '../interface/Restaurant';

export interface RestaurantManager {
  addRestaurant(newRestaurant: Restaurant): void;
  addFavoriteRestaurant(favoriteRestaurant: Restaurant): void;
  sortByAscendingName(): Restaurant[];
  sortByAscendingWalkingTime(): Restaurant[];
  filteredRestaurants(): Restaurant[];
  getUpdatedTotalRestaurants(): Restaurant[];
  getUpdatedFavoriteRestaurants(): Restaurant[];
}

export class RestaurantManager implements RestaurantManager {
  private totalRestaurants: Restaurant[];
  private currentSelectedCategory: string;
  private currentSelectedSorting: string;
  private favoriteRestaurants: Restaurant[];

  constructor(
    restaurants: Restaurant[] = [],
    favoriteRestaurants: Restaurant[] = []
  ) {
    this.totalRestaurants = [...restaurants];
    this.favoriteRestaurants = [...favoriteRestaurants];
    this.currentSelectedCategory = '전체';
    this.currentSelectedSorting = '이름순';
  }

  #updateLocalStorage(key: localKey, value: Restaurant[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  addRestaurant(newRestaurant: Restaurant): void {
    const hasSameName = this.totalRestaurants.some(
      ({ name }) => name === newRestaurant.name
    );
    if (hasSameName) {
      throw new Error(ERROR_MESSAGE.sameRestaurantName);
    }
    this.totalRestaurants.push(newRestaurant);
    this.#updateLocalStorage('restaurants', this.totalRestaurants);
  }

  addFavoriteRestaurant(favoriteRestaurant: Restaurant): void {
    this.favoriteRestaurants.push(favoriteRestaurant);
    switch (this.currentSelectedSorting) {
      case '이름순':
        this.sortByAscendingName();
        break;
      case '거리순':
        this.sortByAscendingWalkingTime();
        break;
      default:
        this.#updateLocalStorage(
          'favoriteRestaurants',
          this.favoriteRestaurants
        );
    }
  }

  sortByAscendingName(selectedRestaurants: Restaurant[] = []): Restaurant[] {
    const sortingRestaurants = this.filteredRestaurants(
      selectedRestaurants
    ).sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return [...sortingRestaurants];
  }

  sortByAscendingWalkingTime(
    selectedRestaurants: Restaurant[] = []
  ): Restaurant[] {
    const sortingRestaurants = this.filteredRestaurants(
      selectedRestaurants
    ).sort((a, b) => {
      const aTime = Number(a.walkingTime);
      const bTime = Number(b.walkingTime);

      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return [...sortingRestaurants];
  }

  updateCurrentCategory(currentSelectedCategory = '전체') {
    this.currentSelectedCategory = currentSelectedCategory;
  }

  updateCurrentSelectedSorting(currentSelectedSorting = '이름순') {
    this.currentSelectedSorting = currentSelectedSorting;
  }

  filteredRestaurants(selectedRestaurants: Restaurant[] = []): Restaurant[] {
    if (this.currentSelectedCategory === '전체') {
      return [...selectedRestaurants];
    }

    return selectedRestaurants.filter(
      (restaurant) => restaurant.category === this.currentSelectedCategory
    );
  }

  getUpdatedTotalRestaurants(): Restaurant[] {
    switch (this.currentSelectedSorting) {
      case '이름순':
        return this.sortByAscendingName([...this.totalRestaurants]);
      case '거리순':
        return this.sortByAscendingWalkingTime([...this.totalRestaurants]);
      default:
        return this.sortByAscendingName([...this.totalRestaurants]);
    }
  }

  getUpdatedFavoriteRestaurants(): Restaurant[] {
    switch (this.currentSelectedSorting) {
      case '이름순':
        return this.sortByAscendingName([...this.favoriteRestaurants]);
      case '거리순':
        return this.sortByAscendingWalkingTime([...this.favoriteRestaurants]);
      default:
        return this.sortByAscendingName([...this.favoriteRestaurants]);
    }
  }

  removeTotalRestaurant(removeRestaurant: Restaurant): Restaurant[] {
    this.totalRestaurants = this.totalRestaurants.filter((restaurant) => {
      return restaurant['name'] !== removeRestaurant['name'];
    });
    this.#updateLocalStorage('restaurants', this.totalRestaurants);
    return [...this.totalRestaurants];
  }

  removeFavoriteRestaurant(removeRestaurant: Restaurant): Restaurant[] {
    this.favoriteRestaurants = this.favoriteRestaurants.filter((restaurant) => {
      return restaurant['name'] !== removeRestaurant['name'];
    });
    this.#updateLocalStorage('favoriteRestaurants', this.favoriteRestaurants);

    return [...this.favoriteRestaurants];
  }
}
