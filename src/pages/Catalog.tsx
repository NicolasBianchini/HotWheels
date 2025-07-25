import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Heart, Filter, X } from 'lucide-react';
import { useProducts } from '../contexts/ProductsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import type { HotWheelsCar, CartItem } from '../types';

interface CatalogProps {
    addToCart: (item: CartItem) => void;
}

const Catalog = ({ addToCart }: CatalogProps) => {
    const { products, loading, error } = useProducts();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const [searchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const search = searchParams.get('search') || '';
    const category = searchParams.get('categoria') || '';
    const brand = searchParams.get('marca') || '';

    // Get unique values for filters
    const brands = [...new Set(products.map(p => p.brand))].sort();
    const categories = [...new Set(products.filter(p => p.category).map(p => p.category!))].sort();
    const series = [...new Set(products.map(p => p.series))].sort();
    const years = [...new Set(products.map(p => p.year.toString()))].sort((a, b) => parseInt(b) - parseInt(a));

    useEffect(() => {
        let filtered = products;

        // Search filter
        if (search) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.series.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Category filter from URL
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        // Brand filter from URL
        if (brand) {
            filtered = filtered.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
        }

        // Brand filter from checkboxes
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product => selectedBrands.includes(product.brand));
        }

        // Selected categories filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => product.category && selectedCategories.includes(product.category));
        }

        // Series filter
        if (selectedSeries.length > 0) {
            filtered = filtered.filter(product => selectedSeries.includes(product.series));
        }

        // Year filter
        if (selectedYears.length > 0) {
            filtered = filtered.filter(product => selectedYears.includes(product.year.toString()));
        }

        // Price range filter
        if (priceRange.min !== '') {
            filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
        }
        if (priceRange.max !== '') {
            filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'year-new':
                    return b.year - a.year;
                case 'year-old':
                    return a.year - b.year;
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    }, [products, search, category, brand, selectedBrands, selectedCategories, selectedSeries, selectedYears, priceRange, sortBy]);

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedCategories([]);
        setSelectedSeries([]);
        setSelectedYears([]);
        setPriceRange({ min: '', max: '' });
        setSortBy('name');
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleSeries = (ser: string) => {
        setSelectedSeries(prev =>
            prev.includes(ser) ? prev.filter(s => s !== ser) : [...prev, ser]
        );
    };

    const toggleYear = (year: string) => {
        setSelectedYears(prev =>
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
        );
    };

    const handleAddToCart = (product: HotWheelsCar) => {
        addToCart({
            ...product,
            quantity: 1
        });
    };

    const handleToggleFavorite = (product: HotWheelsCar) => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando catálogo...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Erro ao carregar catálogo: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-xl font-bold text-gray-900 mb-1">
                        {search ? `Resultados para "${search}"` :
                            category ? `Categoria: ${category}` :
                                brand ? `Marca: ${brand.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}` : 'Catálogo de Produtos'}
                    </h1>
                    <p className="text-gray-600 text-xs">
                        {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:w-60">
                        <div className="bg-white rounded border border-gray-200 p-3">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900 text-sm">Filtros</h3>
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                                >
                                    {isFilterOpen ? <X className="w-3 h-3" /> : <Filter className="w-3 h-3" />}
                                </button>
                            </div>

                            <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
                                {/* Sort */}
                                <div className="mb-3">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Ordenar por</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full p-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                                    >
                                        <option value="name">Nome A-Z</option>
                                        <option value="price-low">Menor Preço</option>
                                        <option value="price-high">Maior Preço</option>
                                        <option value="year-new">Ano Mais Recente</option>
                                        <option value="year-old">Ano Mais Antigo</option>
                                    </select>
                                </div>

                                {/* Brands */}
                                <div className="mb-3">
                                    <h4 className="font-medium text-gray-900 mb-1 text-xs">Marcas</h4>
                                    <div className="space-y-0.5 max-h-28 overflow-y-auto">
                                        {brands.map((brand) => (
                                            <label key={brand} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => toggleBrand(brand)}
                                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-3 h-3"
                                                />
                                                <span className="ml-1.5 text-xs text-gray-700">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories - only show if there are categories to show */}
                                {categories.length > 0 && (
                                    <div className="mb-3">
                                        <h4 className="font-medium text-gray-900 mb-1 text-xs">Categorias</h4>
                                        <div className="space-y-0.5">
                                            {categories.map((cat) => (
                                                <label key={cat} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(cat)}
                                                        onChange={() => toggleCategory(cat)}
                                                        className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-3 h-3"
                                                    />
                                                    <span className="ml-1.5 text-xs text-gray-700">{cat}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Series */}
                                <div className="mb-3">
                                    <h4 className="font-medium text-gray-900 mb-1 text-xs">Séries</h4>
                                    <div className="space-y-0.5 max-h-28 overflow-y-auto">
                                        {series.map((ser) => (
                                            <label key={ser} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSeries.includes(ser)}
                                                    onChange={() => toggleSeries(ser)}
                                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-3 h-3"
                                                />
                                                <span className="ml-1.5 text-xs text-gray-700">{ser}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Years */}
                                <div className="mb-3">
                                    <h4 className="font-medium text-gray-900 mb-1 text-xs">Anos</h4>
                                    <div className="space-y-0.5 max-h-28 overflow-y-auto">
                                        {years.map((year) => (
                                            <label key={year} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedYears.includes(year)}
                                                    onChange={() => toggleYear(year)}
                                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-3 h-3"
                                                />
                                                <span className="ml-1.5 text-xs text-gray-700">{year}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-3">
                                    <h4 className="font-medium text-gray-900 mb-1 text-xs">Faixa de Preço</h4>
                                    <div className="space-y-1.5">
                                        <input
                                            type="number"
                                            placeholder="Preço mínimo"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                            className="w-full p-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Preço máximo"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                            className="w-full p-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                                        />
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <button
                                    onClick={clearFilters}
                                    className="w-full bg-gray-100 text-gray-700 py-1.5 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Limpar Filtros
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                        {/* Image Container */}
                                        <div className="relative aspect-square">
                                            <Link to={`/produto/${product.id}`}>
                                                <img
                                                    src={product.image || '/placeholder-car.svg'}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain p-3 cursor-pointer group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/placeholder-car.svg';
                                                    }}
                                                />
                                            </Link>
                                            <button
                                                onClick={() => handleToggleFavorite(product)}
                                                className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-md transition-colors ${isFavorite(product.id)
                                                    ? 'text-red-500 hover:text-red-600'
                                                    : 'text-gray-400 hover:text-red-500'
                                                    }`}
                                                title={isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                                            >
                                                <Heart
                                                    className="w-4 h-4"
                                                    fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                                                />
                                            </button>
                                            {product.originalPrice && (
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-md">
                                                        OFERTA
                                                    </span>
                                                </div>
                                            )}
                                            {product.rarity && product.rarity !== 'Comum' && (
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-md">
                                                        {product.rarity}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Container */}
                                        <div className="p-3">
                                            {/* Product Name */}
                                            <Link to={`/produto/${product.id}`}>
                                                <h3 className="font-semibold text-gray-900 mb-1.5 text-center line-clamp-2 hover:text-red-600 transition-colors cursor-pointer text-sm">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            {/* Brand Badge */}
                                            <div className="flex justify-center mb-2">
                                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                                    {product.brand}
                                                </span>
                                            </div>

                                            {/* Price Section */}
                                            <div className="text-center mb-3">
                                                <div className="text-xl font-bold text-gray-900 mb-0.5">
                                                    R$ {product.price.toFixed(2).replace('.', ',')}
                                                </div>
                                                {product.originalPrice && (
                                                    <div className="text-xs text-gray-500 line-through mb-0.5">
                                                        R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                                                    </div>
                                                )}
                                                <div className="text-xs text-cyan-600 font-medium">
                                                    até 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')}
                                                </div>
                                                <div className="text-xs text-cyan-600">
                                                    ou R$ {(product.price * 0.95).toFixed(2).replace('.', ',')} via Pix
                                                </div>
                                            </div>

                                            {/* Stock Status */}
                                            <div className="text-center mb-2">
                                                {product.inStock ? (
                                                    <span className="text-green-600 text-xs font-medium">Em estoque</span>
                                                ) : (
                                                    <span className="text-red-600 text-xs font-medium">Esgotado</span>
                                                )}
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                disabled={!product.inStock}
                                                className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-xs"
                                            >
                                                {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                                <p className="text-gray-600 text-sm">
                                    Tente ajustar os filtros ou fazer uma nova busca.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog; 