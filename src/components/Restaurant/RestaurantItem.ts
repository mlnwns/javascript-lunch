import { Restaurant } from '../../interface/RestaurantInterfaces';
import CategoryImage from './CategoryImage';
import FavoriteImage from './FavoriteImage';

interface Props {
  restaurant: Restaurant;
  onItemClick?: () => void;
  onFavoriteImageClick?: (event: MouseEvent) => void; // 변경된 부분
}

const RestaurantItem = ({ restaurant, onItemClick, onFavoriteImageClick }: Props) => {
  const restaurantItem = document.createElement('li');
  restaurantItem.classList.add('restaurant');

  const restaurantCategory = document.createElement('div');
  restaurantCategory.classList.add('restaurant__category');
  restaurantCategory.appendChild(CategoryImage(restaurant.category));

  const restaurantInfo = document.createElement('div');
  restaurantInfo.classList.add('restaurant__info');

  const restaurantSubInfo = document.createElement('div');
  restaurantSubInfo.classList.add('restaurant__sub-info');

  const restaurantSubInfoFirst = document.createElement('div');

  const restaurantName = document.createElement('h3');
  restaurantName.classList.add('restaurant__name', 'text-subtitle');
  restaurantName.textContent = restaurant.name;
  restaurantSubInfoFirst.appendChild(restaurantName);

  const restaurantDistance = document.createElement('span');
  restaurantDistance.classList.add('restaurant__distance', 'text-body');
  restaurantDistance.textContent = `캠퍼스부터 ${restaurant.distance}분 내`;
  restaurantSubInfoFirst.appendChild(restaurantDistance);

  const restaurantSubInfoSecond = document.createElement('div');
  const favoriteImage = FavoriteImage(restaurant.favorite);
  restaurantSubInfoSecond.appendChild(favoriteImage);

  const restaurantDescription = document.createElement('p');
  restaurantDescription.classList.add('restaurant__description', 'text-body');
  if (restaurant.description) restaurantDescription.textContent = restaurant.description;

  restaurantSubInfo.appendChild(restaurantSubInfoFirst);
  restaurantSubInfo.appendChild(restaurantSubInfoSecond);
  restaurantInfo.appendChild(restaurantSubInfo);
  restaurantInfo.appendChild(restaurantDescription);
  restaurantItem.appendChild(restaurantCategory);
  restaurantItem.appendChild(restaurantInfo);

  if (onItemClick) {
    restaurantItem.addEventListener('click', onItemClick);
  }

  if (onFavoriteImageClick) {
    favoriteImage.addEventListener('click', event => {
      event.stopPropagation();
      onFavoriteImageClick(event);
    });
  }

  return restaurantItem;
};

export default RestaurantItem;
