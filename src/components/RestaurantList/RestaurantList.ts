import RestaurantDBService from '@/domains/services/RestaurantDBService';
import RestaurantItem from './RestaurantItem';
import { IRestaurant } from '@/types/Restaurant';

import './RestaurantList.css';

class RestaurantList extends HTMLUListElement {
  #restaurantList: IRestaurant[];
  #restaurantDBService: RestaurantDBService;

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#restaurantDBService = new RestaurantDBService();
    this.#restaurantList = this.#restaurantDBService.get();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.#removeChildren();

    const restaurantList = this.#restaurantList.map((restaurant) => new RestaurantItem(restaurant));
    restaurantList.forEach((restaurant) => {
      this.append(restaurant);
    });
  }

  paint(restaurants: IRestaurant[]) {
    this.#restaurantList = restaurants;
    this.render();
  }

  #removeChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }
}

customElements.define('restaurant-list', RestaurantList, { extends: 'ul' });
export default RestaurantList;
