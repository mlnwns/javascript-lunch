import { RestaurantState, TabValue } from '../types';

const RestaurantListStorageService = (function () {
  let cachedData: RestaurantState[] | null = null;

  function getData() {
    if (cachedData === null) {
      const restaurantList = localStorage.getItem('restaurantList');
      cachedData = restaurantList ? JSON.parse(restaurantList) : [];
    }
    return cachedData;
  }

  function patchData(restaurantId: number) {
    const data = getData();
    const restaurant = data?.find((restaurant) => restaurant.id === restaurantId);
    if (restaurant) {
      restaurant.isFavorited = !restaurant.isFavorited;
      localStorage.setItem('restaurantList', JSON.stringify(data));
    }
  }

  function setData(restaurant: RestaurantState) {
    const prevData = getData() || [];
    const lastElementId = prevData.length > 0 ? prevData[prevData.length - 1].id : 0;
    const newRestaurant = { ...restaurant, id: lastElementId + 1 };
    const newData = [...prevData, newRestaurant];
    cachedData = newData;
    localStorage.setItem('restaurantList', JSON.stringify(newData));
  }

  function deleteData(restaurant: RestaurantState) {
    const prevData = getData();
    if (prevData) {
      const filteredData = prevData.filter((data) => data.id !== restaurant.id);
      cachedData = filteredData;
      localStorage.setItem('restaurantList', JSON.stringify(filteredData));
    }
  }

  function getDataFromTabValueQuery(tabValue: TabValue) {
    const allData = getData();
    if (tabValue === 'all') {
      return allData;
    }

    const filteredDataByFavorite = allData?.filter((restaurant) => restaurant.isFavorited === true) ?? [];

    return filteredDataByFavorite;
  }

  return {
    getData,
    patchData,
    setData,
    deleteData,
    getDataFromTabValueQuery,
  };
})();

export default RestaurantListStorageService;
