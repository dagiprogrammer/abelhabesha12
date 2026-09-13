import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  getDocs,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export const PRODUCTS_COLLECTION = 'products';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial connection as required by Firestore integration skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline notice. Please check configuration or network.');
      return false;
    }
    // Connection handshake completed
    return true;
  }
}

/**
 * Subscribe to real-time updates from Firestore products collection.
 * Triggers onEveryUpdate callback with live Product array.
 * If Firestore collection is empty, falls back to seed PRODUCTS.
 */
export function subscribeToProducts(
  onUpdate: (products: Product[]) => void,
  onError?: (err: Error) => void
) {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(productsRef);
  
  return onSnapshot(
    q,
    (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Product;
        prods.push({
          ...data,
          id: docSnap.id
        });
      });
      if (prods.length > 0) {
        onUpdate(prods);
      } else {
        // Use default seed products if database is unpopulated
        onUpdate(PRODUCTS);
      }
    },
    (error) => {
      console.warn('Firestore subscription notice (using local seed fallback):', error);
      onUpdate(PRODUCTS);
      if (onError) {
        try {
          handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
        } catch (wrappedErr) {
          onError(wrappedErr as Error);
        }
      }
    }
  );
}

/**
 * Sanitize and validate product fields before writing to Firestore
 */
function sanitizeProduct(product: Partial<Product>): Product {
  const cleanId = (product.id && product.id.trim()) || `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const cleanCode = (product.code && product.code.trim()) || `AH-${Math.floor(1000 + Math.random() * 9000)}`;
  
  return {
    id: cleanId,
    code: cleanCode,
    nameAm: product.nameAm?.trim() || 'የሀበሻ ልብስ',
    nameEn: product.nameEn?.trim() || 'Authentic Habesha Attire',
    nameTi: product.nameTi?.trim() || undefined,
    categoryGroup: product.categoryGroup || 'events',
    hashtags: Array.isArray(product.hashtags) && product.hashtags.length > 0 
      ? product.hashtags.filter(Boolean) 
      : ['#ባህላዊ_ልብስ'],
    fabricAm: product.fabricAm?.trim() || '100% ንጹህ የአክሱም ፈተል',
    fabricEn: product.fabricEn?.trim() || '100% Pure Handspun Axum Cotton',
    fabricTi: product.fabricTi?.trim() || undefined,
    priceETB: Math.max(0, Number(product.priceETB) || 0),
    originalPriceETB: product.originalPriceETB ? Math.max(0, Number(product.originalPriceETB)) : undefined,
    image: product.image?.trim() || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    secondaryImages: Array.isArray(product.secondaryImages) ? product.secondaryImages.filter(Boolean) : undefined,
    descriptionAm: product.descriptionAm?.trim() || 'በሺሮሜዳ በባለሙያዎች የተሸመነ እውነተኛ ባህላዊ አልባሳት።',
    descriptionEn: product.descriptionEn?.trim() || 'Authentic handcrafted Ethiopian attire woven by master artisans in Shiromeda.',
    descriptionTi: product.descriptionTi?.trim() || undefined,
    inStock: product.inStock !== false,
    tailoringDays: Number(product.tailoringDays) || 3,
    featured: Boolean(product.featured),
    bestSeller: Boolean(product.bestSeller),
    badge: product.badge?.trim() || undefined,
  };
}

/**
 * Save or update a product in Firestore.
 */
export async function saveProductToFirestore(product: Product): Promise<Product> {
  const sanitized = sanitizeProduct(product);
  const docRef = doc(db, PRODUCTS_COLLECTION, sanitized.id);
  
  // Clean undefined properties for Firestore
  const cleanData = JSON.parse(JSON.stringify(sanitized));
  
  try {
    await setDoc(docRef, cleanData, { merge: true });
    return sanitized;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${PRODUCTS_COLLECTION}/${sanitized.id}`);
  }
}

/**
 * Update partial fields of a product in Firestore.
 */
export async function updateProductInFirestore(
  productId: string,
  partial: Partial<Product>
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  const cleanData = JSON.parse(JSON.stringify(partial));
  
  try {
    await updateDoc(docRef, cleanData);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PRODUCTS_COLLECTION}/${productId}`);
  }
}

/**
 * Delete a product from Firestore.
 */
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PRODUCTS_COLLECTION}/${productId}`);
  }
}

/**
 * Seed all default Shiromeda products into Firestore.
 */
export async function seedProductsToFirestore(productsToSeed: Product[] = PRODUCTS): Promise<number> {
  let count = 0;
  for (const prod of productsToSeed) {
    await saveProductToFirestore(prod);
    count++;
  }
  return count;
}

/**
 * Remove all products from Firestore (clean slate).
 */
export async function clearAllProductsFromFirestore(): Promise<void> {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  try {
    const snapshot = await getDocs(productsRef);
    const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, PRODUCTS_COLLECTION);
  }
}
