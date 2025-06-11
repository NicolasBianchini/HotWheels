import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import type { HotWheelsCar, CartItem } from '../types';

interface CatalogProps {
    addToCart: (product: CartItem) => void;
}

const Catalog = ({ addToCart }: CatalogProps) => {
    const [searchParams] = useSearchParams();
    const { products, loading } = useProducts();
    const [filteredCars, setFilteredCars] = useState<HotWheelsCar[]>([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Function to filter cars based on search term
    const filterCarsBySearch = (cars: HotWheelsCar[], search: string): HotWheelsCar[] => {
        if (!search.trim()) return cars;

        const searchLower = search.toLowerCase().trim();
        return cars.filter(car =>
            car.name.toLowerCase().includes(searchLower) ||
            car.series.toLowerCase().includes(searchLower) ||
            car.description.toLowerCase().includes(searchLower) ||
            car.color.toLowerCase().includes(searchLower) ||
            car.category.toLowerCase().includes(searchLower) ||
            car.rarity.toLowerCase().includes(searchLower)
        );
    };

    // Function to apply all filters
    const applyFilters = () => {
        let cars = products;

        // Apply category filter
        if (filter !== 'all') {
            cars = cars.filter((car: HotWheelsCar) => car.category === filter);
        }

        // Apply search filter
        cars = filterCarsBySearch(cars, searchTerm);

        setFilteredCars(cars);
    };

    // Handle search from URL params
    useEffect(() => {
        const urlSearchTerm = searchParams.get('search') || '';
        setSearchTerm(urlSearchTerm);
    }, [searchParams]);

    // Apply filters whenever filter or searchTerm changes
    useEffect(() => {
        applyFilters();
    }, [filter, searchTerm]);

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const handleAddToCart = (car: HotWheelsCar) => {
        addToCart({ ...car, quantity: 1 });
        alert(`${car.name} adicionado ao carrinho!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hotwheel-primary mx-auto"></div>
                    <p className="text-hotwheel-gray-600 mt-4 text-center">Carregando produtos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-corporate mb-4">
                        {searchTerm ? `Resultados para "${searchTerm}"` : 'Catálogo Completo'}
                    </h1>
                    <p className="text-subtitle text-lg max-w-2xl mx-auto">
                        {searchTerm
                            ? `Encontramos ${filteredCars.length} produto${filteredCars.length !== 1 ? 's' : ''} para sua busca.`
                            : 'Explore nossa coleção exclusiva de Hot Wheels raros e colecionáveis, cuidadosamente selecionados para entusiastas e colecionadores.'
                        }
                    </p>
                </div>

                {/* Search Info */}
                {searchTerm && (
                    <div className="mb-8">
                        <div className="bg-hotwheel-primary/10 border border-hotwheel-primary/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-hotwheel-primary font-medium">
                                    Buscando por: "{searchTerm}"
                                </p>
                                <Link
                                    to="/catalogo"
                                    className="text-hotwheel-primary hover:text-hotwheel-primary/80 text-sm font-medium"
                                >
                                    Limpar busca
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="mb-12">
                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-corporate mb-4">Filtrar por Categoria</h3>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => handleFilterChange('all')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${filter === 'all'
                                    ? 'bg-hotwheel-primary text-white shadow-lg'
                                    : 'bg-hotwheel-gray-100 text-hotwheel-gray-700 hover:bg-hotwheel-gray-200'
                                    }`}
                            >
                                Todos os Produtos
                            </button>
                            <button
                                onClick={() => handleFilterChange('Mainline')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${filter === 'Mainline'
                                    ? 'bg-hotwheel-primary text-white shadow-lg'
                                    : 'bg-hotwheel-gray-100 text-hotwheel-gray-700 hover:bg-hotwheel-gray-200'
                                    }`}
                            >
                                Mainline
                            </button>
                            <button
                                onClick={() => handleFilterChange('Premium')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${filter === 'Premium'
                                    ? 'bg-hotwheel-primary text-white shadow-lg'
                                    : 'bg-hotwheel-gray-100 text-hotwheel-gray-700 hover:bg-hotwheel-gray-200'
                                    }`}
                            >
                                Premium
                            </button>
                            <button
                                onClick={() => handleFilterChange('Super Treasure Hunt')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${filter === 'Super Treasure Hunt'
                                    ? 'bg-hotwheel-primary text-white shadow-lg'
                                    : 'bg-hotwheel-gray-100 text-hotwheel-gray-700 hover:bg-hotwheel-gray-200'
                                    }`}
                            >
                                Super TH
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCars.map((car) => (
                        <div key={car.id} className="card-corporate overflow-hidden card-hover">
                            <div className="relative">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-hotwheel-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        {car.rarity}
                                    </span>
                                </div>
                                {car.originalPrice && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-hotwheel-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            OFERTA
                                        </span>
                                    </div>
                                )}
                                {!car.inStock && (
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg bg-hotwheel-gray-800 px-4 py-2 rounded-lg">Esgotado</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg mb-2 text-corporate line-clamp-1">{car.name}</h3>
                                <p className="text-subtitle text-sm mb-4 font-medium">{car.series} • {car.year}</p>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        {car.originalPrice && (
                                            <span className="text-hotwheel-gray-400 line-through text-sm mr-2">
                                                R$ {car.originalPrice.toFixed(2)}
                                            </span>
                                        )}
                                        <span className="text-xl font-bold text-hotwheel-primary">
                                            R$ {car.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Link
                                        to={`/produto/${car.id}`}
                                        className="flex-1 btn-secondary text-sm text-center"
                                    >
                                        Ver Detalhes
                                    </Link>
                                    <button
                                        onClick={() => handleAddToCart(car)}
                                        disabled={!car.inStock}
                                        className="flex-1 btn-primary text-sm disabled:bg-hotwheel-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                    >
                                        {car.inStock ? 'Adicionar' : 'Esgotado'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCars.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-12 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-hotwheel-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold text-corporate mb-4">Nenhum produto encontrado</h3>
                            <p className="text-hotwheel-gray-500 mb-6">
                                {searchTerm
                                    ? `Não encontramos produtos que correspondam à sua busca "${searchTerm}".`
                                    : 'Nenhum produto encontrado com os filtros selecionados.'
                                }
                            </p>
                            {searchTerm && (
                                <Link
                                    to="/catalogo"
                                    className="btn-primary inline-block"
                                >
                                    Ver todos os produtos
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog; 