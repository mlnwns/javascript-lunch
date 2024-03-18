import "./RestaurantList.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import Restaurant from "../../../domain/Restaurant/Restaurant";
import { RestaurantDetail } from "../../../domain/Restaurant/Restaurant.type";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { SORT_CATEGORIES_TYPE } from "../../../constants/sortCategory/sortCategory";
import type { SortCategory } from "../../../constants/sortCategory/sortCategory.type";

import RestaurantStorage from "../../../storages/RestaurantStorage";
import { RestaurantTabStatus } from "../RestaurantTab/RestaurantTab.type";

class RestaurantList extends BaseComponent {
  private restaurant = new Restaurant(RestaurantStorage);

  private sortType: SortCategory = SORT_CATEGORIES_TYPE.name;

  private tabStatus: RestaurantTabStatus = this.getAttribute(
    "status"
  ) as RestaurantTabStatus;

  private eventListeners = {
    rerenderRestaurantList: {
      eventName: CUSTOM_EVENT_TYPE.rerenderRestaurantList,
      eventHandler: this.handleRerenderRestaurantList.bind(this),
    },

    sortChange: {
      eventName: CUSTOM_EVENT_TYPE.sortChange,
      eventHandler: this.handleSortRestaurantItems.bind(this),
    },

    filterCategory: {
      eventName: CUSTOM_EVENT_TYPE.filterCategory,
      eventHandler: this.handleFilterRestaurantItems.bind(this),
    },
  } as const;

  protected render(): void {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.createRestaurantItems()}
        </ul> 
      </section>
    `;
  }

  private createRestaurantItems() {
    this.restaurant.updateRestaurants(this.sortType, this.tabStatus);

    const restaurantDetails = this.restaurant.getRestaurantDetails();

    return restaurantDetails.reduce(
      (
        acc: string,
        { name, category, distance, description, isFavorite }: RestaurantDetail
      ) => {
        return (
          acc +
          /* html */ `
          <li>
            <restaurant-item 
              name="${name}"
              category="${category}"
              distance="${distance}"
              description="${description}"
              isFavorite="${isFavorite}"
              class="restaurant"
            ></restaurant-item>
          </li>`
        );
      },
      ""
    );
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.rerenderRestaurantList,
      target: document,
    });

    this.on({ ...this.eventListeners.sortChange, target: document });

    this.on({ ...this.eventListeners.filterCategory, target: document });
  }

  private handleRerenderRestaurantList() {
    this.connectedCallback();
  }

  private handleSortRestaurantItems(event: Event) {
    if (event instanceof CustomEvent) {
      const sortType = event.detail;

      this.sortType = sortType;

      this.restaurant.sortRestaurants(sortType);

      this.connectedCallback();
    }
  }

  private handleFilterRestaurantItems(event: Event) {
    if (event instanceof CustomEvent) {
      const filterType = event.detail;

      this.restaurant.filterRestaurants(filterType, this.sortType);

      this.connectedCallback();
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.rerenderRestaurantList,
      target: document,
    });

    this.off({ ...this.eventListeners.sortChange, target: document });

    this.off({ ...this.eventListeners.filterCategory, target: document });
  }
}

customElements.define("restaurant-list", RestaurantList);
