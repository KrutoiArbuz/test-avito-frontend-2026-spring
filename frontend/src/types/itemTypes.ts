export type CategoryType = 'auto' | 'real_estate' | 'electronics';

export type AutoItemParamsApi = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

export type RealEstateItemParamsApi = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

export type ElectronicsItemParamsApi = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

export type ItemParamsApi = AutoItemParamsApi | RealEstateItemParamsApi | ElectronicsItemParamsApi;

export type ItemListItemApi = {
  id: string;
  category: CategoryType;
  title: string;
  price: number;
  needsRevision: boolean;
  imageUrl?: string;
};

export type ItemApi = {
  id: string;
  category: CategoryType;
  title: string;
  price: number;
  description?: string;
  params: ItemParamsApi;
  createdAt: string;
  needsRevision: boolean;
  imageUrl?: string;
};

export type ItemsGetOutApi = {
  items: ItemListItemApi[];
  total: number;
};

export type ItemUpdateInApi = {
  category: CategoryType;
  title: string;
  description?: string;
  price: number;
  params: ItemParamsApi;
};

export type ItemSortColumn = 'title' | 'createdAt' | 'price';
export type ItemSortDirection = 'asc' | 'desc';

export type ItemsQueryParamsApi = {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: true;
  categories?: CategoryType | string;
  sortColumn?: ItemSortColumn;
  sortDirection?: ItemSortDirection;
};

export type ItemListItemModel = ItemListItemApi;

export type ItemModel = ItemApi;
