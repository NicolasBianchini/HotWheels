import { useState } from 'react';
import { Link } from 'react-router-dom';
import { hotWheelsCars } from '../data/cars';
import type { HotWheelsCar, CartItem } from '../types';

interface CatalogProps {
    addToCart: (product: CartItem) => void;
}

const Catalog = ({ addToCart }: CatalogProps) => {
    const [filteredCars, setFilteredCars] = useState(hotWheelsCars);
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        if (newFilter === 'all') {
            setFilteredCars(hotWheelsCars);
        } else {
            setFilteredCars(hotWheelsCars.filter(car => car.category === newFilter));
        }
    };

    const handleAddToCart = (car: HotWheelsCar) => {
        addToCart({ ...car, quantity: 1 });
        alert(`${car.name} adicionado ao carrinho!`);
    };

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-corporate mb-4">Catálogo Completo</h1>
                    <p className="text-subtitle text-lg max-w-2xl mx-auto">Explore nossa coleção exclusiva de Hot Wheels raros e colecionáveis, cuidadosamente selecionados para entusiastas e colecionadores.</p>
                </div>

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
                        <p className="text-hotwheel-gray-500 text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog; 