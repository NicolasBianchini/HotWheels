import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { CartItem, HotWheelsCar } from './types';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminProductNew from './pages/AdminProductNew';
import AdminProductEdit from './pages/AdminProductEdit';
import AdminPromotions from './pages/AdminPromotions';
import AdminPromotionNew from './pages/AdminPromotionNew';
import AdminPromotionEdit from './pages/AdminPromotionEdit';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Returns from './pages/Returns';
import Favorites from './pages/Favorites';
import DataMigration from './components/DataMigration';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('hotwheels-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('hotwheels-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addProductToCart = (product: HotWheelsCar) => {
    addToCart({ ...product, quantity: 1 });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthProvider>
      <NotificationProvider>
        <ProductsProvider>
          <FavoritesProvider>
            <Router>
              <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header cartCount={cartCount} />

                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home addToCart={addProductToCart} />} />
                    <Route path="/catalogo" element={<Catalog addToCart={addToCart} />} />
                    <Route path="/produto/:id" element={<ProductDetail addToCart={addToCart} />} />
                    <Route
                      path="/carrinho"
                      element={
                        <Cart
                          items={cartItems}
                          updateQuantity={updateCartQuantity}
                          removeItem={removeFromCart}
                        />
                      }
                    />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/contato" element={<Contact />} />
                    <Route path="/pagamento" element={<Payment />} />
                    <Route path="/trocas" element={<Returns />} />
                    <Route
                      path="/favoritos"
                      element={<Favorites addToCart={addProductToCart} />}
                    />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Register />} />

                    {/* Migration Route - Temporary */}
                    <Route path="/migrate" element={<DataMigration />} />

                    {/* Admin Routes */}
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <Admin />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/produtos"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminProducts />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/produtos/novo"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminProductNew />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/produtos/:id/editar"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminProductEdit />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/usuarios"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminUsers />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/promocoes"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminPromotions />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/promocoes/nova"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminPromotionNew />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/promocoes/:id/editar"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminPromotionEdit />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>

                <Footer />
              </div>
            </Router>
          </FavoritesProvider>
        </ProductsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
