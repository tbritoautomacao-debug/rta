
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Restaurant, Category, Product, Order, OrderStatus } from './types';

interface RTAState {
  user: User | null;
  restaurant: Restaurant | null;
  categories: Category[];
  products: Product[];
  orders: Order[];
  onboardingStep: number;
  
  // Actions
  setUser: (user: User | null) => void;
  setRestaurant: (restaurant: Restaurant | null) => void;
  setOnboardingStep: (step: number) => void;
  
  // Menu Actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Order Actions
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

export const useStore = create<RTAState>()(
  persist(
    (set) => ({
      user: null,
      restaurant: null,
      categories: [
        { id: '1', name: 'Hambúrgueres', order: 1 },
        { id: '2', name: 'Bebidas', order: 2 },
      ],
      products: [
        { id: 'p1', categoryId: '1', name: 'RTA Burger', description: 'Pão brioche, blend 180g, queijo cheddar, bacon crocante e molho especial.', price: 34.90, status: 'AVAILABLE', image: 'https://picsum.photos/seed/burger/400/300' },
        { id: 'p2', categoryId: '2', name: 'Coca-Cola 350ml', description: 'Gelada e refrescante.', price: 6.50, status: 'AVAILABLE', image: 'https://picsum.photos/seed/coke/400/300' },
      ],
      orders: [],
      onboardingStep: 0,

      setUser: (user) => set({ user }),
      setRestaurant: (restaurant) => set({ restaurant }),
      setOnboardingStep: (onboardingStep) => set({ onboardingStep }),

      addCategory: (cat) => set((state) => ({
        categories: [...state.categories, { ...cat, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updateCategory: (id, updates) => set((state) => ({
        categories: state.categories.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter(c => c.id !== id)
      })),

      addProduct: (prod) => set((state) => ({
        products: [...state.products, { ...prod, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),

      addOrder: (orderData) => set((state) => {
        const newOrder: Order = {
          ...orderData,
          id: Math.random().toString(36).substr(2, 9),
          orderNumber: (state.orders.length + 1).toString().padStart(3, '0'),
          createdAt: new Date().toISOString(),
          status: 'PENDING'
        };
        // Simple notification sound logic could go here
        return { orders: [newOrder, ...state.orders] };
      }),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      })),
    }),
    { name: 'rta-storage' }
  )
);
