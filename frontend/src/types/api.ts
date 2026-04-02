export type Category = 'auto' | 'real_estate' | 'electronics';

export type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

export type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

export type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

export type ItemParams = AutoItemParams | RealEstateItemParams | ElectronicsItemParams;

export type Item = {
  id: string;
  category: Category;
  title: string;
  price: number;
  description?: string;
  params: ItemParams;
  createdAt: string;
  needsRevision: boolean;
};

export type ItemListItem = {
  id: string;
  category: Category;
  title: string;
  price: number;
  needsRevision: boolean;
};

export type ItemsGetOut = {
  items: ItemListItem[];
  total: number;
};

export type ItemUpdateIn = {
  category: Category;
  title: string;
  description?: string;
  price: number;
  params: ItemParams;
};

export type ItemsQueryParams = {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: true;
  categories?: Category | string;
  sortColumn?: 'title' | 'createdAt';
  sortDirection?: 'asc' | 'desc';
};
