import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import type { CartItem } from './types';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';


// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
      <Router>
        <div className="min-h-screen bg-hotwheel-dark flex flex-col">
          <Header cartCount={cartCount} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
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
              <Route path="/perfil" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
