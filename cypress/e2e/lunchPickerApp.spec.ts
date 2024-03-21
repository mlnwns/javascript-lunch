import restaurants from '../fixtures/restaurants.json';

describe('점심 뭐 먹지 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(550, 950);
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  });

  it('새로운 음식점을 추가할 수 있다.', () => {
    cy.get('.gnb__button').click();

    cy.get('.modal-category').select('한식');
    cy.get('.modal-restaurant-name').type('파슬리와 썬데이의 삼겹살집');
    cy.get('.modal-distance').select('5');
    cy.get('.modal-description').type('파슬리와 썬데이가 장인 정신으로 한땀한땀 구워주는 삼겹살 맛집입니다.');
    cy.get('.modal-reference').type('https://www.woowacourse.io/');

    cy.get('restaurant-add-modal').find('.button--primary').click();

    cy.get('.restaurant').last().find('.restaurant__name').should('contain', '파슬리와 썬데이의 삼겹살집');
    cy.get('.restaurant').last().find('.restaurant__distance').should('contain', '5');
    cy.get('.restaurant')
      .last()
      .find('.restaurant__description')
      .should('contain', '파슬리와 썬데이가 장인 정신으로 한땀한땀 구워주는 삼겹살 맛집입니다.');
  });

  context('탭을 클릭하여 음식점 목록을 확인할 수 있다.', () => {
    it('모든 음식점 탭에서는 모든 음식점 목록이 표시된다.', () => {
      cy.get('.all').click();

      cy.get('.restaurant').should('have.length', restaurants.length);
    });

    it('자주 가는 음식점 탭에서는 자주 가는 음식점 목록이 표시된다.', () => {
      cy.get('.favorites').click();

      cy.get('.restaurant').should('have.length', restaurants.length);
    });
  });

  context('음식점을 카테고리 별로 필터링할 수 있다.', () => {
    it('한식을 선택한 경우 카테고리가 한식인 음식점만 표시된다.', () => {
      cy.get('.category').select('한식');

      cy.get('.restaurant').find('.restaurant__name').should('contain', '파슬리네 김치찌개');
    });

    it('중식을 선택한 경우 카테고리가 중식인 음식점만 표시된다.', () => {
      cy.get('.category').select('중식');

      cy.get('.restaurant').find('.restaurant__name').should('contain', '파슬리네 짜장면');
    });

    it('양식을 선택한 경우 카테고리가 양식인 음식점만 표시된다.', () => {
      cy.get('.category').select('양식');

      cy.get('.restaurant').find('.restaurant__name').should('contain', '썬데이네 파스타');
    });

    it('일식을 선택한 경우 카테고리가 일식인 음식점만 표시된다.', () => {
      cy.get('.category').select('일식');

      cy.get('.restaurant').find('.restaurant__name').should('contain', '파슬리네 회전초밥');
    });

    it('아시안을 선택한 경우 카테고리가 아시안인 음식점만 표시된다.', () => {
      cy.get('.category').select('아시안');

      cy.get('.restaurant').find('.restaurant__name').should('contain', '썬데이네 쌀국수');
    });

    it('기타를 선택한 경우 카테고리가 기타인 음식점만 표시된다.', () => {
      cy.get('.category').select('기타');

      cy.get('.restaurant').find('.restaurant__name').should('contain', '썬데이네 반찬가게');
    });
  });

  context('음식점을 이름순, 거리순으로 정렬할 수 있다.', () => {
    it('이름순을 선택한 경우 이름순으로 음식점이 정렬된다.', () => {
      cy.get('.sorting').select('이름순');

      cy.get('.restaurant').first().find('.restaurant__name').should('contain', '썬데이네 반찬가게');
      cy.get('.restaurant').last().find('.restaurant__name').should('contain', '파슬리네 회전초밥');
    });

    it('거리순을 선택한 경우 거리순으로 음식점이 정렬된다.', () => {
      cy.get('.sorting').select('거리순');

      cy.get('.restaurant').first().find('.restaurant__name').should('contain', '썬데이네 반찬가게');
      cy.get('.restaurant').last().find('.restaurant__name').should('contain', '파슬리네 짜장면');
    });
  });

  it('음식점을 클릭하면 음식점 상세 정보를 확인할 수 있다.', () => {
    cy.get('.restaurant').first().find('.restaurant__info').click();

    cy.get('restaurant-detail-modal').find('.restaurant__name').should('contain', '썬데이네 반찬가게');
    cy.get('restaurant-detail-modal').find('.restaurant__distance').should('contain', '5');
  });

  it('음식점 상세 정보에서 음식점을 삭제할 수 있다.', () => {
    cy.get('.restaurant').first().find('.restaurant__info').click();
    cy.get('restaurant-detail-modal').first().find('.button--secondary').click();

    cy.get('.restaurant').should('have.length', restaurants.length - 1);
    cy.get('.restaurant').first().find('.restaurant__name').should('contain', '썬데이네 쌀국수');
    cy.get('.restaurant').first().find('.restaurant__distance').should('contain', '15');
  });

  context('자주 가는 음식점을 추가할 수 있다.', () => {
    it('음식점 목록에서 아이콘을 클릭하면 자주 가는 음식점에 추가된다.', () => {
      cy.get('.restaurant').first().find('.favorite__button').click();
      cy.get('.favorites').click();

      cy.get('.restaurant').should('have.length', 4);
      cy.get('.restaurant').first().find('.restaurant__name').should('contain', '썬데이네 반찬가게');
      cy.get('.restaurant').first().find('.restaurant__distance').should('contain', '5');
    });

    it('음식점 상세 정보에서 아이콘을 클릭하면 자주 가는 음식점에 추가된다.', () => {
      cy.get('.restaurant').first().find('.restaurant__info').click();
      cy.get('restaurant-detail-modal').first().find('.favorite__button').click();
      cy.get('restaurant-detail-modal').first().find('.button--primary').click();
      cy.get('.favorites').click();

      cy.get('.restaurant').should('have.length', 4);
      cy.get('.restaurant').first().find('.restaurant__name').should('contain', '썬데이네 반찬가게');
      cy.get('.restaurant').first().find('.restaurant__distance').should('contain', '5');
    });
  });
});
