
export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'FINISHED' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  restaurantId?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  address: string;
  openingHours: string;
  paymentMethods: string[];
  pixKey?: string;
  whatsappConfig?: {
    apiKey: string;
    isConnected: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  status: 'AVAILABLE' | 'UNAVAILABLE';
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerWhatsapp: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}
