import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, LogOut, Settings, ChevronDown, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';

import RafaLogo from '../assets/logo.png';

interface HeaderProps {
    cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, logout, isAdmin } = useAuth();
    const { favoritesCount } = useFavorites();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/catalogo?search=${encodeURIComponent(searchTerm.trim())}`);
            setIsMenuOpen(false);
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
            if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
                setIsCategoriesOpen(false);
            }
        };

        if (isUserMenuOpen || isCategoriesOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen, isCategoriesOpen]);

    const brands = [
        { name: 'Hot Wheels', path: '/catalogo?marca=hot-wheels' },
        { name: 'Mini GT', path: '/catalogo?marca=mini-gt' },
        { name: 'Majorette', path: '/catalogo?marca=majorette' },
        { name: 'Matchbox', path: '/catalogo?marca=matchbox' },
        { name: 'Tarmac', path: '/catalogo?marca=tarmac' },
    ];

    return (
        <header className="bg-gray-900 border-b border-gray-700">
            {/* Main Header - Mais compacto */}
            <div className="container mx-auto px-4">
                <div className="py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br">
                                <img src={RafaLogo} alt="Logo" className="w-10 h-10" />
                            </div>
                            <div className="hidden md:block">
                                <h1 className="font-bold text-xl text-white">Hot Wheels Marketplace</h1>
                                <p className="text-xs text-gray-300">Miniaturas de Carros e Colecionáveis</p>
                            </div>
                        </Link>

                        {/* Search bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-6">
                            <form onSubmit={handleSearch} className="relative w-full">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar produtos..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-8 pr-4 py-2 border border-gray-600 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400 transition-all duration-200 text-sm"
                                />
                            </form>
                        </div>

                        {/* Right side - Favorites, Cart, User and Mobile Menu */}
                        <div className="flex items-center space-x-3">
                            {/* Favorites */}
                            <Link
                                to="/favoritos"
                                className="relative p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded hover:bg-gray-700"
                                title="Meus Favoritos"
                            >
                                <Heart className="w-5 h-5" />
                                {favoritesCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                                        {favoritesCount}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link
                                to="/carrinho"
                                className="relative p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded hover:bg-gray-700"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User Menu */}
                            {user ? (
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center space-x-2 p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded hover:bg-gray-700"
                                    >
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-6 h-6 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                                <User className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                        <span className="hidden xl:block text-sm font-semibold text-white">{user.name}</span>
                                    </button>

                                    {/* User Dropdown */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-1 w-48 bg-white rounded shadow-xl border border-gray-200 z-50">
                                            <div className="py-1">
                                                <div className="px-3 py-2 border-b border-gray-100">
                                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-600">{user.email}</p>
                                                </div>
                                                <Link
                                                    to="/perfil"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Settings className="w-3 h-3 mr-2" />
                                                    Editar Perfil
                                                </Link>
                                                {isAdmin() && (
                                                    <Link
                                                        to="/admin"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                                                    >
                                                        <Settings className="w-3 h-3 mr-2" />
                                                        Painel Admin
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <LogOut className="w-3 h-3 mr-2" />
                                                    Sair
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center space-x-2">
                                    <Link
                                        to="/login"
                                        className="px-3 py-1.5 text-sm font-semibold text-gray-300 hover:text-red-400 transition-colors"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        to="/registro"
                                        className="bg-red-600 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
                                    >
                                        Cadastre-se
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded hover:bg-gray-700"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories Navigation - Mais compacto */}
                <div className="border-t border-gray-700 py-2">
                    <nav className="flex items-center space-x-6 text-sm">
                        <div className="relative" ref={categoriesRef}>
                            <button
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                className="flex items-center space-x-1 text-gray-300 hover:text-red-400 font-medium transition-colors"
                            >
                                <span>Miniaturas</span>
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            {isCategoriesOpen && (
                                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded shadow-xl border border-gray-200 z-50">
                                    <div className="py-1">
                                        {brands.map((brand) => (
                                            <Link
                                                key={brand.name}
                                                to={brand.path}
                                                onClick={() => setIsCategoriesOpen(false)}
                                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                {brand.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link to="/catalogo?categoria=promocoes" className="text-gray-300 hover:text-red-400 font-medium transition-colors">
                            Promoções
                        </Link>
                    </nav>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-700 py-3">
                        {/* Mobile Search */}
                        <div className="mb-3">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar produtos..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-8 pr-4 py-2 border border-gray-600 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400 transition-all duration-200 text-sm"
                                />
                            </form>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="space-y-1 mb-3">
                            <Link
                                to="/"
                                className="block py-2 px-2 text-gray-300 hover:text-red-400 font-medium transition-colors rounded hover:bg-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Início
                            </Link>
                            <Link
                                to="/catalogo"
                                className="block py-2 px-2 text-gray-300 hover:text-red-400 font-medium transition-colors rounded hover:bg-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Catálogo
                            </Link>
                            <Link
                                to="/sobre"
                                className="block py-2 px-2 text-gray-300 hover:text-red-400 font-medium transition-colors rounded hover:bg-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sobre
                            </Link>
                        </nav>

                        {/* Mobile Auth Links */}
                        {!user && (
                            <div className="space-y-1 border-t border-gray-700 pt-3">
                                <Link
                                    to="/login"
                                    className="block w-full text-center py-2 px-3 text-gray-300 hover:text-red-400 font-medium transition-colors rounded hover:bg-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Entrar
                                </Link>
                                <Link
                                    to="/registro"
                                    className="block w-full text-center py-2 px-3 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Cadastre-se
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 