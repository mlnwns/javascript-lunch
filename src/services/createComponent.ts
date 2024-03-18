import {
  generateRestaurantDescriptionComponentData,
  generateRestaurantNameComponentData,
  generateRestaurantDistanceComponentData,
  generateRestaurantBottomSheetDescriptionComponentData,
  generateRestaurantBottomSheetLinkComponentData,
  generateRestaurantIsFavoritedComponentData,
} from './generateRestaurantComponentData';
import generateHeadingComponent from '../uiUtils/generateHeadingComponent';
import generateSpanComponent from '../uiUtils/generateSpanComponent';
import generatePComponent from '../uiUtils/generatePComponent';
import generateImageComponent from '../uiUtils/generateImageComponent';
import generateAComponenet from '../uiUtils/generateAComponent';

export const createTitleComponent = (name: string) => {
  const titleComponentData = generateRestaurantNameComponentData(name);
  return generateHeadingComponent(titleComponentData);
};

export const createDistanceComponent = (distance: string) => {
  const distanceComponentData = generateRestaurantDistanceComponentData(distance);
  return generateSpanComponent(distanceComponentData);
};

export const createDescriptionComponent = (description?: string) => {
  if (description) {
    const descriptionComponentData = generateRestaurantDescriptionComponentData(description);
    return generatePComponent(descriptionComponentData);
  }
};

export const createBottomSheetDescriptionComponent = (textContent?: string) => {
  const bottomSheetComponentData = generateRestaurantBottomSheetDescriptionComponentData(textContent);
  return generatePComponent(bottomSheetComponentData);
};

export const createBottomSheetRestaurantLinkComponent = (link?: string) => {
  const bottomSheetLinkComponentData = generateRestaurantBottomSheetLinkComponentData(link);

  return generateAComponenet(bottomSheetLinkComponentData);
};

export const createIsFavoriteImageComponent = (isFavorited: boolean) => {
  const isFavoritedComponentData = generateRestaurantIsFavoritedComponentData(isFavorited);
  return generateImageComponent(isFavoritedComponentData);
};
