
export enum Category {
  MOTOR = 'Motor',
  SUSPENSION = 'Suspensión',
  FRENOS = 'Frenos',
  ILUMINACION = 'Iluminación',
  CARROCERIA = 'Carrocería',
  ELECTRONICA = 'Electrónica'
}

export enum StockStatus {
  IN_STOCK = 'En stock',
  LOW_STOCK = 'Bajo stock',
  OUT_OF_STOCK = 'Agotado'
}

export interface StockMovement {
  id: string;
  date: string;
  type: 'IN' | 'OUT';
  quantity: number;
  note: string;
}

export interface Part {
  id: string;
  name: string;
  reference: string;
  description: string;
  category: Category;
  brand: string;
  compatibleModels: string[];
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  imageUrl: string;
  barcode?: string;
  movements: StockMovement[];
}

export type ViewType = 'DASHBOARD' | 'INVENTORY' | 'ANALYTICS' | 'SETTINGS';
