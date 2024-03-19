import { ERROR_PREFIX } from '../src/constants/errorMessage.js';
import { IRestaurantInfo } from '../src/domain/Restaurant.ts';
import restaurantCatalog, { RestaurantCatalog } from '../src/domain/RestaurantCatalog.ts';

describe('RestaurantCatalog 예외 테스트', () => {
  const invalidRestaurantCase: IRestaurantInfo[] = [
    {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 5,
    },
    {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 5,
    },
  ];

  test.each(invalidRestaurantCase)('중복된 이름의 음식점이 추가되면 에러가 발생한다.', (input) => {
    const newRestaurantCatalog = new RestaurantCatalog();
    newRestaurantCatalog.pushNewRestaurant(input);

    expect(() => {
      newRestaurantCatalog.pushNewRestaurant(input);
    }).toThrow(`${ERROR_PREFIX}`);
  });
});

describe('RestaurantCatalog 기능 테스트', () => {
  const validRestaurantCase: IRestaurantInfo[] = [
    {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 5,
    },
    {
      category: '양식',
      name: '빕스',
      distanceFromCampus: 5,
    },
    {
      category: '양식',
      name: '칙바이칙',
      distanceFromCampus: 10,
    },
    {
      category: '한식',
      name: '깡장시골보리밥',
      distanceFromCampus: 5,
    },
  ];

  let newRestaurantCatalog: RestaurantCatalog;

  beforeEach(() => {
    newRestaurantCatalog = new RestaurantCatalog();

    validRestaurantCase.forEach((restaurantInfo) => {
      newRestaurantCatalog.pushNewRestaurant(restaurantInfo);
    });
  });

  test('4개의 음식점을 추가하면 4개의 음식점이 추가된다.', () => {
    expect(newRestaurantCatalog.getRestaurantsClass().length).toEqual(4);
  });

  test('category 필터링 테스트 - 한식 필터링 시 4개 음식점 중 2개 음식점 반환', () => {
    expect(newRestaurantCatalog.filterByCategory('한식').length).toEqual(2);
  });

  test('category 이름순 정렬 테스트 - 오름차순 정렬', () => {
    expect(restaurantCatalog.sortByName(validRestaurantCase)[0].name).toEqual('깡장시골보리밥');
  });

  test('category 거리순 정렬 테스트 - 오름차순 정렬, 동률일 시 이름의 오름차순으로', () => {
    const restaurantsSorted = restaurantCatalog.sortByDistance(validRestaurantCase);
    expect(restaurantsSorted[0].name).toEqual('깡장시골보리밥');
    expect(restaurantsSorted[1].name).toEqual('반포식스');
  });
});
