import RestaurantService from '../../src/domain/RestaurantService';

describe('레스토랑 추가 기능 테스트', () => {
  const restaurantService = new RestaurantService();
  const DUMMY = [
    {
      category: '한식',
      name: '꺼벙이분식',
      distance: 5,
      description: '돈까스 김밥 맛집',
      link: 'www.naver.com',
      favorite: false,
    },
    {
      category: '중식',
      name: '친친',
      distance: 5,
      description: '게살볶음밥 굿',
      link: 'www.daum.net',
      favorite: false,
    },
  ];

  it('모든 속성을 입력한 경우 레스토랑을 추가할 수 있다.', () => {
    const newRestaurant = {
      category: '기타',
      name: '오한수 우육면가',
      distance: 10,
      description: '우육면 + 군만두',
      link: 'www.naver.com',
      favorite: false,
    };

    const result = restaurantService.addRestaurant(newRestaurant, DUMMY);

    expect(result).to.equal(true);
  });

  it('옵션 값들을 입력하지 않아도 레스토랑을 추가할 수 있다.', () => {
    const newRestaurant = {
      category: '한식',
      name: '배가무닭볶음탕',
      distance: 10,
      description: undefined,
      link: undefined,
      favorite: false,
    };

    const result = restaurantService.addRestaurant(newRestaurant, DUMMY);

    expect(result).to.equal(true);
  });

  it('카테고리와 이름이 중복된 레스토랑을 추가할 수 없다.', () => {
    const newRestaurant = {
      category: '한식',
      name: '꺼벙이분식',
      distance: 10,
      description: '돈까스 김밥 + 순대',
      link: 'www.naver.com',
      favorite: false,
    };

    const result = restaurantService.addRestaurant(newRestaurant, DUMMY);

    expect(result).to.equal(false);
  });
});

describe('레스토랑 삭제 기능 테스트', () => {
  const restaurantService = new RestaurantService();
  const DUMMY = [
    {
      category: '한식',
      name: '꺼벙이분식',
      distance: 5,
      description: '돈까스 김밥 맛집',
      link: 'www.naver.com',
      favorite: false,
    },
    {
      category: '중식',
      name: '친친',
      distance: 5,
      description: '게살볶음밥 굿',
      link: 'www.daum.net',
      favorite: false,
    },
  ];

  it('해당 레스토랑을 찾아 삭제할 수 있다.', () => {
    const existRestaurant = [
      {
        category: '한식',
        name: '꺼벙이분식',
        distance: 5,
        description: '돈까스 김밥 맛집',
        link: 'www.naver.com',
        favorite: false,
      },
    ];

    const result = restaurantService.removeRestaurant(existRestaurant, DUMMY);
    expect(result).to.deep.equal(DUMMY);
  });
});

describe('레스토랑 카테고리 별 필터링 기능 테스트', () => {
  const restaurantService = new RestaurantService();
  const DUMMY = [
    {
      category: '한식',
      name: '꺼벙이분식',
      distance: 5,
      description: '돈까스 김밥 맛집',
      link: 'www.naver.com',
      favorite: false,
    },
    {
      category: '한식',
      name: '용호동낙지',
      distance: 10,
      description: '사장님 츤데레',
      link: 'www.naver.com',
      favorite: false,
    },
    {
      category: '중식',
      name: '친친',
      distance: 5,
      description: '게살볶음밥 굿',
      link: 'www.daum.net',
      favorite: false,
    },
  ];

  it('카테고리가 전체인 경우 전체 레스토랑 리스트를 반환한다.', () => {
    const category = '전체';

    const result = restaurantService.filterByCategory(category, DUMMY);

    expect(result).to.deep.equal(DUMMY);
  });

  const categories = ['한식', '중식'];
  const expectedResult = [[DUMMY[0], DUMMY[1]], [DUMMY[2]]];

  categories.forEach((category, index) => {
    it(`카테고리가 ${category}인 경우 해당하는 레스토랑 리스트를 반환한다.`, () => {
      const result = restaurantService.filterByCategory(category, DUMMY);

      expect(result).to.deep.equal(expectedResult[index]);
    });
  });
});

describe('레스토랑 정렬 기능 테스트', () => {
  const restaurantService = new RestaurantService();

  const DUMMY = [
    {
      category: '한식',
      name: '배가무닭볶음탕',
      distance: 15,
      description: '무가 맛있어요',
      link: 'www.naver.com',
      favorite: false,
    },
    {
      category: '한식',
      name: '용호동낙지',
      distance: 10,
      description: '사장님 츤데레',
      link: 'www.naver.com',
      favorite: false,
    },
    {
      category: '중식',
      name: '친친',
      distance: 5,
      description: '게살볶음밥 굿',
      link: 'www.daum.net',
      favorite: false,
    },
  ];

  const properties = ['name', 'distance'];

  const expectedResult = [
    [DUMMY[0], DUMMY[1], DUMMY[2]],
    [DUMMY[2], DUMMY[1], DUMMY[0]],
  ];

  properties.forEach((property, index) => {
    it(`정렬 기준이 ${property}인 경우 기준에 맞게 정렬된 레스토랑 리스트를 반환한다.`, () => {
      const result = restaurantService.sortByProperty(property, DUMMY);

      expect(result).to.deep.equal(expectedResult[index]);
    });
  });
});

describe('레스토랑 자주가는 음식점 기능 테스트', () => {
  const restaurantService = new RestaurantService();

  const DUMMY = [
    {
      category: '한식',
      name: '배가무닭볶음탕',
      distance: 15,
      description: '무가 맛있어요',
      link: 'www.naver.com',
      favorite: true,
    },
    {
      category: '한식',
      name: '용호동낙지',
      distance: 10,
      description: '사장님 츤데레',
      link: 'www.naver.com',
      favorite: false,
    },
    {
      category: '중식',
      name: '친친',
      distance: 5,
      description: '게살볶음밥 굿인데 양 좀 적음',
      link: 'www.daum.net',
      favorite: true,
    },
  ];

  it('자주가는 음식점만 필터링하여 보여줄 수 있다.', () => {
    const expectedResult = [DUMMY[0], DUMMY[2]];

    const result = restaurantService.filterByFavorite(DUMMY);
    expect(result).to.deep.equal(expectedResult);
  });
});
