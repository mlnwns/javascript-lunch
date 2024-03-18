import { APP_NAME } from '../constant/appString.ts';
import createNewRestaurantModal from './modal/addRestaurantModal.js';
import modal from './modal.js';

function createHeader({ className, left, right, restaurantAdditionCallback }) {
  const header = document.createElement('header');
  header.className = className;

  const leftElement = item[left]();
  const rightElement = item[right](restaurantAdditionCallback);

  header.append(leftElement, rightElement);
  return header;
}

const item = {
  logo() {
    const h1 = document.createElement('h1');
    h1.className = 'gnb__title text-title';
    h1.textContent = APP_NAME;
    return h1;
  },

  restaurantAdditionButton(restaurantAdditionCallback) {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'gnb__button';
    button.setAttribute('aria-label', '음식점 추가');

    const img = document.createElement('img');

    img.src = './add-button.png';
    img.alt = '음식점 추가';

    button.appendChild(img);
    eventHandler.addEventRestaurantButton(button, restaurantAdditionCallback);

    return button;
  },
};

const eventHandler = {
  addEventRestaurantButton(element, restaurantAdditionCallback) {
    element.addEventListener('click', () => {
      const newRestaurantModalElement = createNewRestaurantModal(
        restaurantAdditionCallback
      );
      const newRestaurantModal = modal.create(
        'modal--open',
        newRestaurantModalElement
      );
      document.body.append(newRestaurantModal);
    });
  },
};

export default createHeader;
