export const SELECT_FIELD: SelectFieldType = {
  sortingFilter: {
    id: 'sorting-filter',
    name: 'sorting',
    options: {
      name: '이름순',
      distance: '거리순',
    },
  },
  categoryFilter: {
    id: 'category-filter',
    name: 'category',
    options: {
      전체: '전체',
      한식: '한식',
      중식: '중식',
      일식: '일식',
      양식: '양식',
      아시안: '아시안',
      기타: '기타',
    },
  },
};

export const FIELD_IDS: FieldIdsType = {
  requiredIds: ['category', 'name', 'distance'],
  selectIds: ['sorting-filter', 'category-filter'],
};

export const CONVERT: ConvertType = {
  name: '이름',
  category: '카테고리',
  distance: '거리',
};

export const STORAGE_KEYS = {
  restaurants: 'restaurants',
  sorting: 'sorting-filter',
  category: 'category-filter',
};

export const STORAGE_INITIAL_VALUES = {
  initialSorting: 'name',
  initialCategory: '전체',
};
