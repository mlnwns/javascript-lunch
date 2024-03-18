import { createDropDown } from '../component/dropDown';
import createHeader from '../component/header';
import modal from '../component/modal';
import createRestaurantCard from '../component/restaurantCard';
import { createTabBar } from '../component/tabBar';
import { categoryFilterList, sortingFilterList } from '../constant/select';
import { RestaurantManager } from '../domain/RestaurantManager';
import { createRestaurantDetail } from '../component/modal/restaurantDetail';

export class appController {
  #restaurantManager;
  #currentTab;

  constructor() {
    const totalRestaurantsData =
      JSON.parse(localStorage.getItem('restaurants')) || [];
    const favoriteRestaurantsData =
      JSON.parse(localStorage.getItem('favoriteRestaurants')) || [];
    this.#restaurantManager = new RestaurantManager(
      totalRestaurantsData,
      favoriteRestaurantsData
    );
    this.#currentTab = '모든 음식점';
  }

  setMainPage() {

    // tabBar 부착
    const handleTotalRestaurantTabClick = () => {
      this.updateRestaurantList(
        this.#restaurantManager.getUpdatedTotalRestaurants()
      );
      this.#currentTab = '모든 음식점';
    }
    const handleFavoriteRestaurantTabClick = () => {
      this.updateRestaurantList(
        this.#restaurantManager.getUpdatedFavoriteRestaurants()
      );
      this.#currentTab = '자주 가는 음식점';
    }

    document.body.insertAdjacentElement(
      'afterbegin',
      createTabBar([
        {
          className: 'tab__bar__item checked',
          text: '모든 음식점',
          callback: handleTotalRestaurantTabClick,
        },
        {
          className: 'tab__bar__item',
          text: '자주 가는 음식점',
          callback: handleFavoriteRestaurantTabClick,
        },
      ])
    );

    // header 부착
    document.body.insertAdjacentElement(
      'afterbegin',
      createHeader({
        className: 'gnb',
        left: 'logo',
        right: 'restaurantAdditionButton',
        restaurantAdditionCallback: (newRestaurant) => {
          this.#restaurantManager.addRestaurant(newRestaurant);
          this.currentTabRestaurantList();
          modal.remove('modal--open');
        },
      })
    );

    const restaurantFilterContainer = document.querySelector(
      '.restaurant-filter-container'
    );

    restaurantFilterContainer.appendChild(
      createDropDown({
        name: 'category',
        id: 'category-filter',
        options: categoryFilterList,
        className: 'restaurant-filter',
        callback: (category) => {
          this.#restaurantManager.updateCurrentCategory(category);
          this.currentTabRestaurantList();
        },
      })
    );

    restaurantFilterContainer.appendChild(
      createDropDown({
        name: 'sorting',
        id: 'sorting-filter',
        className: 'restaurant-filter',
        options: sortingFilterList,
        callback: (category) => {
          this.#restaurantManager.updateCurrentSelectedSorting(category);
          this.currentTabRestaurantList();
        },
      })
    );

    this.currentTabRestaurantList();
  }

  updateRestaurantList(restaurants) {
    const restaurantListContainer = document.querySelector(
      '.restaurant-list-container'
    );
    restaurantListContainer.replaceChildren();
    const restaurantList = document.createElement('ul');
    restaurantList.className = 'restaurant-list';

    restaurants.map((restaurant) => {
      const listItem = document.createElement('li');
      listItem.className = 'restaurant';

      const favoriteRestaurantNames = this.#restaurantManager
        .getUpdatedFavoriteRestaurants()
        .map(({ name }) => name);

      const categoryDiv = createRestaurantCard(
        restaurant,
        favoriteRestaurantNames
      );
      listItem.addEventListener('click', (event) =>
        this.clickRestaurantCardListItem(event, restaurant, favoriteRestaurantNames)
      );
      listItem.append(categoryDiv);
      restaurantList.append(listItem);
    });

    restaurantListContainer.appendChild(restaurantList);
  }

  clickRestaurantCardListItem(event, restaurant, favoriteRestaurantNames) {
    const target = event.target;
    if (target.className.includes('star')) {
      this.clickFavoriteButton(event, restaurant);
    } else {
      this.openRestaurantDetailModal(restaurant, favoriteRestaurantNames);
    }
  }

  openRestaurantDetailModal(restaurant, favoriteRestaurantNames) {
    const favoriteCallback = (event) => {
      this.clickFavoriteButton(event, restaurant);
    }

    const deleteCallback = (event) => {
      event.preventDefault();
      document.body.classList.remove('stop-scroll');
      this.#restaurantManager.removeTotalRestaurant(restaurant);
      this.#restaurantManager.removeFavoriteRestaurant(restaurant);
      this.currentTabRestaurantList();
      modal.remove('modal--open');
    }

    const cancelCallback = (event) => {
      document.body.classList.remove('stop-scroll');
      modal.remove('modal--open');
      this.currentTabRestaurantList();
    }

    const restaurantDetailModal = modal.create(
      'modal--open',
      createRestaurantDetail({
        restaurant,
        favoriteRestaurantNames,
        favoriteCallback,
        deleteCallback,
        cancelCallback,
      })
    );
    document.body.classList.add('stop-scroll');
    document.body.append(restaurantDetailModal);
  }

  clickFavoriteButton(event, restaurant) {
    const target = event.target;
    if (target.className === 'star lined') {
      this.#restaurantManager.addFavoriteRestaurant(restaurant);
      target.src = './favorite-icon-filled.png';
      target.className = 'star filled';
    } else if (target.className === 'star filled') {
      this.#restaurantManager.removeFavoriteRestaurant(restaurant);
      target.src = './favorite-icon-lined.png';
      target.className = 'star lined';
    }
  }

  currentTabRestaurantList() {
    if (this.#currentTab === '모든 음식점')
      return this.updateRestaurantList(
        this.#restaurantManager.getUpdatedTotalRestaurants()
      );
    if (this.#currentTab === '자주 가는 음식점')
      return this.updateRestaurantList(
        this.#restaurantManager.getUpdatedFavoriteRestaurants()
      );
  }
}
