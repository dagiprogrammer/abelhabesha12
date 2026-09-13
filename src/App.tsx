import React, { useState, useEffect, useCallback } from 'react';
import { Product, Language, ViewType, CategoryGroupId } from './types';
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
import { CustomTailoringModal } from './components/CustomTailoringModal';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';

function parseInitialRoute(): { view: ViewType; productCode: string | null } {
  if (typeof window !== 'undefined') {
    const rawPath = window.location.pathname.toLowerCase();
    const path = rawPath.replace(/\/+/g, '/');
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    
    // Check for product code in hash or path (e.g. #product-AH-1001 or #/product/AH-1001)
    const productMatch = hash.match(/product[-/]([a-z0-9-]+)/i) || path.match(/product\/([a-z0-9-]+)/i);
    if (productMatch && productMatch[1]) {
      return { view: 'detail', productCode: productMatch[1].toUpperCase() };
    }

    if (path.includes('admin') || hash.includes('admin') || search.includes('admin')) {
      return { view: 'admin', productCode: null };
    }
    if (path.includes('product') || hash.includes('product') || search.includes('product')) {
      return { view: 'products', productCode: null };
    }
    if (path.includes('about') || hash.includes('about') || search.includes('about')) {
      return { view: 'about', productCode: null };
    }
    if (path.includes('contact') || hash.includes('contact') || search.includes('contact')) {
      return { view: 'contact', productCode: null };
    }
  }
  return { view: 'home', productCode: null };
}

export function App() {
  // Live products from Firebase Firestore
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  
  // App view & preferences
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB');
  
  const initialRoute = parseInitialRoute();
  const [currentView, setCurrentView] = useState<ViewType>(initialRoute.view);
  const [pendingProductCode, setPendingProductCode] = useState<string | null>(initialRoute.productCode);
  
  // Selection states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroupId>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom bespoke tailoring modal
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  
  // Admin auth
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('abel_habesha_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  // Match pending product code when products list is loaded/updated
  useEffect(() => {
    if (pendingProductCode && products.length > 0) {
      const match = products.find(
        (p) => p.code.toUpperCase() === pendingProductCode || p.id === pendingProductCode
      );
      if (match) {
        setSelectedProduct(match);
        setCurrentView('detail');
      }
      setPendingProductCode(null);
    }
  }, [pendingProductCode, products]);

  // Subscribe to live Firestore updates on mount
  useEffect(() => {
    const unsubscribe = subscribeToProducts((liveProducts) => {
      if (liveProducts && liveProducts.length > 0) {
        setProducts(liveProducts);
      }
    });
    return () => unsubscribe();
  }, []);

  // URL history & route sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentView === 'detail' && selectedProduct) {
        window.history.replaceState({ view: 'detail', code: selectedProduct.code }, '', `/#product-${selectedProduct.code}`);
      } else if (currentView === 'admin') {
        window.history.replaceState({ view: 'admin' }, '', '/admin');
      } else if (currentView === 'home') {
        window.history.replaceState({ view: 'home' }, '', '/');
      } else {
        window.history.replaceState({ view: currentView }, '', `/${currentView}`);
      }
    }
  }, [currentView, selectedProduct]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = parseInitialRoute();
      if (route.view === 'detail' && route.productCode) {
        setPendingProductCode(route.productCode);
      } else {
        setCurrentView(route.view);
        setSelectedProduct(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Navigation handlers
  const handleNavigate = useCallback((view: 'home' | 'products' | 'about' | 'contact' | 'admin') => {
    setCurrentView(view);
    setSelectedProduct(null);
    if (view === 'admin' && !isAuthenticatedAdmin) {
      setIsAdminAuthOpen(true);
    }
  }, [isAuthenticatedAdmin]);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  }, []);

  const handleBackFromDetail = useCallback(() => {
    setSelectedProduct(null);
    setCurrentView('products');
  }, []);

  const handleSelectCategoryTag = useCallback((tag: string) => {
    setSelectedTag(tag);
    setSelectedGroup('all');
    setCurrentView('products');
  }, []);

  const handleExploreCatalog = useCallback(() => {
    setSelectedTag(null);
    setSelectedGroup('all');
    setCurrentView('products');
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D241E] flex flex-col selection:bg-[#8B0000]/15 selection:text-[#8B0000]">
      
      {/* Sticky Top Header & Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={0}
        onOpenCart={() => {}}
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
            onAddToCart={handleSelectProduct}
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
            onAddToCart={handleSelectProduct}
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            currency={currency}
            language={language}
            onBack={handleBackFromDetail}
            onSelectProduct={handleSelectProduct}
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

      {/* Custom Tailoring Request Modal */}
      {isCustomOrderOpen && (
        <CustomTailoringModal
          language={language}
          onClose={() => setIsCustomOrderOpen(false)}
        />
      )}

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

      {/* Floating Bottom Right Quick Contacts - Hidden on Admin View */}
      {currentView !== 'admin' && (
        <FloatingContact language={language} />
      )}

    </div>
  );
}

export default App;
