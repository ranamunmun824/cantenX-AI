export type Category = 
  | 'Breakfast' 
  | 'Meals' 
  | 'Snacks' 
  | 'Beverages' 
  | 'Fast Food' 
  | 'Desserts';

export type FoodType = 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  type: FoodType;
  image: string;
  rating: number;
  reviewCount: number;
  prepTimeMinutes: number;
  available: boolean;
  remainingStock: number;
  popular?: boolean;
  recommended?: boolean;
  calories?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type OrderStatus = 
  | 'Placed' 
  | 'Confirmed' 
  | 'Preparing' 
  | 'Ready' 
  | 'Completed' 
  | 'Cancelled';

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  type: FoodType;
  image: string;
}

export interface Order {
  id: string;
  token: string; // e.g. "CX-1042"
  studentId: string;
  studentName: string;
  studentRoll: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'Pay at Counter' | 'UPI' | 'Cash';
  pickupSlot: string;
  estimatedWaitMinutes: number;
  queuePosition: number;
  createdAt: string; // ISO or formatted
  completedAt?: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  menuItemId: string;
  name: string;
  category: Category;
  openingStock: number;
  soldQuantity: number;
  remainingStock: number;
  wastage: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedItems?: MenuItem[];
}

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  rollNumber?: string;
  department?: string;
}
