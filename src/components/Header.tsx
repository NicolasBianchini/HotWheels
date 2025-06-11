import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, LogOut, Settings } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, logout, isAdmin } = useAuth();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/catalogo?search=${encodeURIComponent(searchTerm.trim())}`);
            setIsMenuOpen(false); // Close mobile menu if open
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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    return (
        <header className="bg-white border-b border-hotwheel-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-hotwheel-primary to-hotwheel-red rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-racing text-lg">HW</span>
                            </div>
                            <div className="hidden md:block">
                                <h1 className="font-bold text-xl text-hotwheel-gray-900">Hot Wheels</h1>
                                <p className="text-xs text-hotwheel-gray-600 font-medium">Rafis Marketplace</p>
                            </div>
                        </Link>

                        {/* Navigation - Desktop */}
                        <nav className="hidden lg:flex items-center space-x-6">
                            <Link
                                to="/"
                                className="text-hotwheel-gray-700 hover:text-hotwheel-primary font-semibold transition-colors"
                            >
                                Início
                            </Link>
                            <Link
                                to="/catalogo"
                                className="text-hotwheel-gray-700 hover:text-hotwheel-primary font-semibold transition-colors"
                            >
                                Catálogo
                            </Link>
                            <Link
                                to="/sobre"
                                className="text-hotwheel-gray-700 hover:text-hotwheel-primary font-semibold transition-colors"
                            >
                                Sobre
                            </Link>
                        </nav>

                        {/* Search bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-6">
                            <form onSubmit={handleSearch} className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotwheel-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar carrinhos..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-9 pr-4 py-2.5 border border-hotwheel-gray-300 bg-hotwheel-gray-50 text-hotwheel-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary placeholder-hotwheel-gray-500 transition-all duration-200 text-sm"
                                />
                            </form>
                        </div>

                        {/* Right side - Cart, User and Mobile Menu */}
                        <div className="flex items-center space-x-3">
                            {/* Cart */}
                            <Link
                                to="/carrinho"
                                className="relative p-2 text-hotwheel-gray-600 hover:text-hotwheel-primary transition-colors rounded-lg hover:bg-hotwheel-gray-50"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-hotwheel-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User Menu */}
                            {user ? (
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center space-x-2 p-2 text-hotwheel-gray-700 hover:text-hotwheel-primary transition-colors rounded-lg hover:bg-hotwheel-gray-50"
                                    >
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-7 h-7 rounded-full object-cover ring-2 ring-hotwheel-gray-200 shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 bg-hotwheel-primary rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <span className="hidden xl:block text-sm font-semibold">{user.name}</span>
                                    </button>

                                    {/* User Dropdown */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-hotwheel-gray-200 z-50">
                                            <div className="py-2">
                                                <div className="px-4 py-3 border-b border-hotwheel-gray-100">
                                                    <p className="text-sm font-semibold text-hotwheel-gray-900">{user.name}</p>
                                                    <p className="text-sm text-hotwheel-gray-600">{user.email}</p>
                                                </div>
                                                <Link
                                                    to="/perfil"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center w-full px-4 py-3 text-sm text-hotwheel-gray-700 hover:bg-hotwheel-gray-50 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4 mr-3" />
                                                    Editar Perfil
                                                </Link>
                                                {isAdmin() && (
                                                    <Link
                                                        to="/admin"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center w-full px-4 py-3 text-sm text-hotwheel-gray-700 hover:bg-hotwheel-gray-50 transition-colors border-t border-hotwheel-gray-100"
                                                    >
                                                        <Settings className="w-4 h-4 mr-3" />
                                                        Painel Admin
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-3 text-sm text-hotwheel-gray-700 hover:bg-hotwheel-gray-50 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3" />
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
                                        className="px-4 py-2 text-sm font-semibold text-hotwheel-gray-700 hover:text-hotwheel-primary transition-colors"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        to="/registro"
                                        className="btn-primary text-sm px-4 py-2"
                                    >
                                        Cadastre-se
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 text-hotwheel-gray-700 hover:text-hotwheel-primary transition-colors rounded-lg hover:bg-hotwheel-gray-50"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-hotwheel-gray-100 py-4">
                        {/* Mobile Search */}
                        <div className="mb-4">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotwheel-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar carrinhos..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-9 pr-4 py-2.5 border border-hotwheel-gray-300 bg-hotwheel-gray-50 text-hotwheel-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary placeholder-hotwheel-gray-500 transition-all duration-200 text-sm"
                                />
                            </form>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="space-y-2 mb-4">
                            <Link
                                to="/"
                                className="block py-3 px-2 text-hotwheel-gray-700 hover:text-hotwheel-primary font-semibold transition-colors rounded-lg hover:bg-hotwheel-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Início
                            </Link>
                            <Link
                                to="/catalogo"
                                className="block py-3 px-2 text-hotwheel-gray-700 hover:text-hotwheel-primary font-semibold transition-colors rounded-lg hover:bg-hotwheel-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Catálogo
                            </Link>
                            <Link
                                to="/sobre"
                                className="block py-3 px-2 text-hotwheel-gray-700 hover:text-hotwheel-primary font-semibold transition-colors rounded-lg hover:bg-hotwheel-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sobre
                            </Link>
                        </nav>

                        {/* Mobile Auth Links */}
                        {!user && (
                            <div className="space-y-2 border-t border-hotwheel-gray-100 pt-4">
                                <Link
                                    to="/login"
                                    className="btn-secondary w-full text-center text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Entrar
                                </Link>
                                <Link
                                    to="/registro"
                                    className="btn-primary w-full text-center text-sm"
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