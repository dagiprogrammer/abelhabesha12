import React, { useState, useEffect } from 'react';
import { Product, Language, ViewType, CategoryGroupId, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { subscribeToProducts } from './lib/productsService';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuth } from './components/AdminAuth';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomTailoringModal } from './components/CustomTailoringModal';
import { CartModal } from './components/CartModal';
import { Footer } from './components/Footer';

function parseInitialView(): ViewType {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('/admin') || hash.includes('admin') || search.includes('admin')) {
      return 'admin';
    }
    if (path.includes('/products') || hash.includes('products')) {
      return 'products';
    }
    if (path.includes('/about') || hash.includes('about')) {
      return 'about';
    }
    if (path.includes('/contact') || hash.includes('contact')) {
      return 'contact';
    }
  }
  return 'home';
}

export function App() {
  // Products from Firebase Firestore with fallback to seed catalog
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  
  // App view & preferences
  const [language, setLanguage] = useState<Language>('am');
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB');
  const [currentView, setCurrentView] = useState<ViewType>(parseInitialView);
  
  // Selection states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroupId>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('abel_habesha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Admin auth
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('abel_habesha_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  // URL history synchronization for /admin and storefront views
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const targetPath = currentView === 'admin' ? '/admin' : currentView === 'home' ? '/' : `/${currentView}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view: currentView }, '', targetPath);
      }
    }
  }, [currentView]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(parseInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Subscribe to live Firestore updates on mount
  useEffect(() => {
    const unsubscribe = subscribeToProducts((liveProducts) => {
      if (liveProducts && liveProducts.length > 0) {
        setProducts(liveProducts);
      }
    });
    return () => unsubscribe();
  }, []);

  // Persist cart items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('abel_habesha_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id && item.size === 'Standard');
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { product, size: 'Standard', quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddToCartWithDetails = (
    product: Product,
    size: string,
    measurements?: { length?: string; bustChest?: string; waist?: string; hips?: string },
    notes?: string
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        product,
        size,
        customMeasurements: measurements,
        notes,
        quantity: 1
      }
    ]);
    if (quickViewProduct) setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Navigation handlers
  const handleNavigate = (view: 'home' | 'products' | 'about' | 'contact' | 'admin') => {
    setCurrentView(view);
    setSelectedProduct(null);
    if (view === 'admin' && !isAuthenticatedAdmin) {
      setIsAdminAuthOpen(true);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleSelectCategoryTag = (tag: string) => {
    setSelectedTag(tag);
    setSelectedGroup('all');
    setCurrentView('products');
  };

  const handleExploreCatalog = () => {
    setSelectedTag(null);
    setSelectedGroup('all');
    setCurrentView('products');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D241E] flex flex-col selection:bg-[#8B0000]/15 selection:text-[#8B0000]">
      
      {/* Sticky Top Header & Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && currentView !== 'products') {
            setCurrentView('products');
          }
        }}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        onLogoClick={() => handleNavigate('home')}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            products={products}
            currency={currency}
            language={language}
            onExploreCatalog={handleExploreCatalog}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onSelectCategoryTag={handleSelectCategoryTag}
            onNavigateAbout={() => handleNavigate('about')}
          />
        )}

        {(currentView === 'products' || currentView === 'catalog') && (
          <ProductsPage
            products={products}
            currency={currency}
            language={language}
            selectedGroup={selectedGroup}
            onSelectGroup={setSelectedGroup}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            searchQuery={searchQuery}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            currency={currency}
            language={language}
            onBack={() => setCurrentView('products')}
            onSelectProduct={handleSelectProduct}
            onAddToCartWithDetails={handleAddToCartWithDetails}
            onTagClick={handleSelectCategoryTag}
          />
        )}

        {currentView === 'about' && (
          <AboutUsPage
            language={language}
            onExploreCatalog={handleExploreCatalog}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
          />
        )}

        {currentView === 'contact' && (
          <ContactUsPage language={language} />
        )}

        {currentView === 'admin' && (
          <AdminPanel
            products={products}
            language={language}
            onClose={() => setCurrentView('home')}
            onLogout={() => {
              try {
                localStorage.removeItem('abel_habesha_admin_session');
              } catch {}
              setIsAuthenticatedAdmin(false);
              setCurrentView('home');
            }}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        onLanguageChange={setLanguage}
        onSelectCategory={(tag) => handleSelectCategoryTag(tag)}
        onNavigate={handleNavigate}
      />

      {/* Quick View / Detail Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          currency={currency}
          language={language}
          onClose={() => setQuickViewProduct(null)}
          onAddToCartWithDetails={handleAddToCartWithDetails}
        />
      )}

      {/* Custom Tailoring Request Modal */}
      {isCustomOrderOpen && (
        <CustomTailoringModal
          language={language}
          onClose={() => setIsCustomOrderOpen(false)}
        />
      )}

      {/* Slide-out Order Bag Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Admin Authentication Gate Modal */}
      {(isAdminAuthOpen || (currentView === 'admin' && !isAuthenticatedAdmin)) && (
        <AdminAuth
          language={language}
          onAuthenticated={() => {
            setIsAuthenticatedAdmin(true);
            setIsAdminAuthOpen(false);
            setCurrentView('admin');
          }}
          onCancel={() => {
            setIsAdminAuthOpen(false);
            if (currentView === 'admin') {
              setCurrentView('home');
            }
          }}
        />
      )}

    </div>
  );
}

export default App;
