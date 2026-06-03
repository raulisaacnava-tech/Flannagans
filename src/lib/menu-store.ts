import { Product, Category, Extra, Allergen } from '@/types/menu';
import { Restaurant } from '@/types/restaurant';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_RESTAURANT, 
  INITIAL_CATEGORIES, 
  INITIAL_EXTRAS, 
  INITIAL_ALLERGENS 
} from './data';
import { getRestaurantWithDefaults } from './restaurant-content';

const PRODUCTS_KEY = 'flanagans_products_v5';
const RESTAURANT_KEY = 'flanagans_restaurant_v5';

// Función helper para verificar si estamos en el navegador
const isClient = () => typeof window !== 'undefined';

export const getCategories = (): Category[] => {
  return INITIAL_CATEGORIES;
};

export const getExtras = (): Extra[] => {
  return INITIAL_EXTRAS;
};

export const getAllergens = (): Allergen[] => {
  return INITIAL_ALLERGENS;
};

export const getProducts = (): Product[] => {
  if (!isClient()) {
    return INITIAL_PRODUCTS;
  }
  const local = localStorage.getItem(PRODUCTS_KEY);
  if (!local) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    console.error('Error parsing local products, resetting data', e);
    return INITIAL_PRODUCTS;
  }
};

export const saveProducts = (products: Product[]) => {
  if (!isClient()) return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  // Disparar un evento personalizado para actualizar otros componentes en tiempo real
  window.dispatchEvent(new Event('flanagans_menu_updated'));
};

export const createProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `product_${Date.now()}`,
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updatedFields: Partial<Product>): Product => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Product with id ${id} not found`);
  }
  const updatedProduct = {
    ...products[index],
    ...updatedFields,
  };
  products[index] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
};

export const deleteProduct = (id: string): void => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
};

export const getRestaurant = (): Restaurant => {
  if (!isClient()) {
    return getRestaurantWithDefaults(INITIAL_RESTAURANT);
  }
  const local = localStorage.getItem(RESTAURANT_KEY);
  if (!local) {
    localStorage.setItem(RESTAURANT_KEY, JSON.stringify(INITIAL_RESTAURANT));
    return getRestaurantWithDefaults(INITIAL_RESTAURANT);
  }
  try {
    return getRestaurantWithDefaults(JSON.parse(local) as Restaurant);
  } catch (e) {
    console.error('Error parsing local restaurant data', e);
    return getRestaurantWithDefaults(INITIAL_RESTAURANT);
  }
};

export const updateRestaurant = (updatedFields: Partial<Restaurant>): Restaurant => {
  const restaurant = getRestaurant();
  const updatedRestaurant = {
    ...restaurant,
    ...updatedFields,
  };
  if (isClient()) {
    localStorage.setItem(RESTAURANT_KEY, JSON.stringify(updatedRestaurant));
    window.dispatchEvent(new Event('flanagans_restaurant_updated'));
  }
  return getRestaurantWithDefaults(updatedRestaurant);
};

export const resetDemoData = (): void => {
  if (!isClient()) return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(RESTAURANT_KEY, JSON.stringify(INITIAL_RESTAURANT));
  window.dispatchEvent(new Event('flanagans_menu_updated'));
  window.dispatchEvent(new Event('flanagans_restaurant_updated'));
};
