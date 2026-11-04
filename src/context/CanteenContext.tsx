import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  CartItem, 
  Order, 
  OrderStatus, 
  InventoryItem, 
  UserProfile, 
  UserRole 
} from '../types';
import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_ORDERS, 
  INITIAL_INVENTORY, 
  DEMO_STUDENT, 
  DEMO_ADMIN 
} from '../data/seedData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface CanteenContextType {
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  orders: Order[];
  activeStudentOrder: Order | undefined;
  createOrder: (paymentMethod: 'Pay at Counter' | 'UPI' | 'Cash', pickupSlot: string, notes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  inventory: InventoryItem[];
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  resetDemoData: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const CanteenContext = createContext<CanteenContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: 'canteenx_menu_v1',
  CART: 'canteenx_cart_v1',
  ORDERS: 'canteenx_orders_v1',
  INVENTORY: 'canteenx_inventory_v1',
  USER_ROLE: 'canteenx_user_role_v1',
};

export const CanteenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user role
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return savedRole === 'admin' ? DEMO_ADMIN : DEMO_STUDENT;
  });

  // Menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MENU);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_MENU_ITEMS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ORDERS;
  });

  // Inventory
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_INVENTORY;
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  }, [inventory]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 't_' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const profile = role === 'admin' ? DEMO_ADMIN : DEMO_STUDENT;
    setCurrentUser(profile);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    showToast(`Switched view to ${profile.name} (${role.toUpperCase()})`, 'info');
  };

  const addToCart = (item: MenuItem, quantity = 1) => {
    if (!item.available) {
      showToast(`${item.name} is currently sold out!`, 'error');
      return;
    }
    setCart(prev => {
      const existing = prev.find(ci => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map(ci => 
          ci.menuItem.id === item.id 
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity }];
    });
    showToast(`Added ${item.name} to cart`);
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find(ci => ci.menuItem.id === itemId);
    setCart(prev => prev.filter(ci => ci.menuItem.id !== itemId));
    if (item) {
      showToast(`Removed ${item.menuItem.name} from cart`, 'info');
    }
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(ci => 
      ci.menuItem.id === itemId ? { ...ci, quantity } : ci
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, ci) => acc + (ci.menuItem.price * ci.quantity), 0);
  const cartItemCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  // Active student order (prioritize student's latest active order like CX-1042 or newly placed)
  const activeStudentOrder = orders.find(
    o => o.studentId === currentUser.id && ['Placed', 'Confirmed', 'Preparing', 'Ready'].includes(o.status)
  ) || orders.find(o => o.token === 'CX-1042');

  const createOrder = (
    paymentMethod: 'Pay at Counter' | 'UPI' | 'Cash',
    pickupSlot: string,
    notes?: string
  ): Order => {
    const nextTokenNum = 1042 + orders.length + 1;
    const token = `CX-${nextTokenNum}`;
    const newOrderId = `ord_${Date.now()}`;

    const orderItems = cart.map(ci => ({
      id: `oi_${Date.now()}_${ci.menuItem.id}`,
      menuItemId: ci.menuItem.id,
      name: ci.menuItem.name,
      price: ci.menuItem.price,
      quantity: ci.quantity,
      type: ci.menuItem.type,
      image: ci.menuItem.image,
    }));

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: newOrderId,
      token,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentRoll: currentUser.rollNumber || '21BCE1042',
      items: orderItems,
      totalAmount: cartTotal,
      status: 'Placed',
      paymentMethod,
      pickupSlot: pickupSlot || 'Immediate (Next 10 mins)',
      estimatedWaitMinutes: 8 + Math.floor(Math.random() * 5),
      queuePosition: orders.filter(o => ['Placed', 'Confirmed', 'Preparing'].includes(o.status)).length + 1,
      createdAt: timeString,
      notes,
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update inventory remaining stock
    setInventory(prev => prev.map(inv => {
      const matchInCart = cart.find(ci => ci.menuItem.id === inv.menuItemId);
      if (matchInCart) {
        const newSold = inv.soldQuantity + matchInCart.quantity;
        const newRemaining = Math.max(0, inv.remainingStock - matchInCart.quantity);
        return {
          ...inv,
          soldQuantity: newSold,
          remainingStock: newRemaining,
          status: newRemaining === 0 ? 'Out of Stock' : newRemaining < 20 ? 'Low Stock' : 'In Stock',
          lastUpdated: timeString,
        };
      }
      return inv;
    }));

    clearCart();
    showToast(`Order confirmed! Your token is ${token}`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const completedAt = status === 'Completed' 
          ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          : order.completedAt;
        const wait = status === 'Completed' || status === 'Ready' ? 0 : order.estimatedWaitMinutes;
        return { ...order, status, completedAt, estimatedWaitMinutes: wait };
      }
      return order;
    }));
    showToast(`Order status updated to: ${status}`, 'info');
  };

  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `m_${Date.now()}`,
    };
    setMenuItems(prev => [newItem, ...prev]);

    // Add to inventory
    const newInvItem: InventoryItem = {
      id: `inv_${newItem.id}`,
      menuItemId: newItem.id,
      name: newItem.name,
      category: newItem.category,
      openingStock: newItem.remainingStock || 50,
      soldQuantity: 0,
      remainingStock: newItem.remainingStock || 50,
      wastage: 0,
      unit: newItem.category === 'Beverages' ? 'cups' : 'portions',
      status: newItem.remainingStock > 20 ? 'In Stock' : 'Low Stock',
      lastUpdated: 'Just now',
    };
    setInventory(prev => [newInvItem, ...prev]);
    showToast(`Added "${newItem.name}" to menu`, 'success');
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    // also update inventory name/category if changed
    setInventory(prev => prev.map(inv => {
      if (inv.menuItemId === id) {
        return {
          ...inv,
          name: updates.name ?? inv.name,
          category: updates.category ?? inv.category,
          status: updates.available === false ? 'Out of Stock' : inv.status,
        };
      }
      return inv;
    }));
    showToast(`Updated menu item`, 'success');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    setInventory(prev => prev.filter(inv => inv.menuItemId !== id));
    showToast(`Deleted item from menu`, 'info');
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(inv => {
      if (inv.id === id) {
        const updated = { ...inv, ...updates };
        if (updated.remainingStock <= 0) {
          updated.status = 'Out of Stock';
        } else if (updated.remainingStock < 20) {
          updated.status = 'Low Stock';
        } else {
          updated.status = 'In Stock';
        }
        return updated;
      }
      return inv;
    }));
    showToast(`Updated inventory records`, 'success');
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.INVENTORY);
    setMenuItems(INITIAL_MENU_ITEMS);
    setCart([]);
    setOrders(INITIAL_ORDERS);
    setInventory(INITIAL_INVENTORY);
    showToast('Demo data successfully reset to factory defaults', 'info');
  };

  return (
    <CanteenContext.Provider
      value={{
        currentUser,
        switchRole,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        orders,
        activeStudentOrder,
        createOrder,
        updateOrderStatus,
        inventory,
        updateInventoryItem,
        resetDemoData,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => {
  const context = useContext(CanteenContext);
  if (!context) {
    throw new Error('useCanteen must be used within a CanteenProvider');
  }
  return context;
};
