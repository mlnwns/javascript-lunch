import Restaurant from '../Common/Restaurant/Restaurant';
import Select from '../Common/Select/Select';
import { $ } from '../../utils/dom';
import { RULES } from '../../constants/rules';
import { SELECT_FILTER_DATA } from '../../data/selectData';

export default class RestaurantFilter {
  #element;
  #restaurants;

  constructor(element, restaurants) {
    this.#element = element;
    this.#restaurants = restaurants;
    this.render();
    this.#addEvents();
  }

  render() {
    this.#element.insertAdjacentHTML(
      'afterbegin',
      `<section id="restaurant-filter-container" class="restaurant-filter-container">
        ${Select(SELECT_FILTER_DATA.sorting, localStorage.getItem('sorting-filter'))}
        ${Select(SELECT_FILTER_DATA.category, localStorage.getItem('category-filter'))}
      </section>`,
    );
  }

  #addEvents() {
    $('content').addEventListener('change', (event) => this.#handleSelectChange(event.target));
  }

  #handleSelectChange(target) {
    if (RULES.selectIds.some((id) => target.id === id)) {
      const selectedValue = target.options[target.selectedIndex].value;
      this.#restaurants.standard = { id: target.id, standard: selectedValue };
    }

    this.#reRenderRestaurantList();
  }

  #reRenderRestaurantList() {
    $('restaurant-list').innerHTML = this.#restaurants.standardList.reduce(
      (prevRestaurantData, currentRestaurantData) =>
        prevRestaurantData + Restaurant(currentRestaurantData),
      '',
    );
  }
}
