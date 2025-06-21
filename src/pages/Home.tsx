import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useProducts } from '../contexts/ProductsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNotifications } from '../contexts/NotificationContext';
import type { HotWheelsCar } from '../types';

interface HomeProps {
    addToCart: (product: HotWheelsCar) => void;
}

const Home = ({ addToCart }: HomeProps) => {
    const { products, loading, error } = useProducts();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const { success } = useNotifications();
    const newReleases = products.slice(0, 16); // Mais produtos para visualização

    const handleToggleFavorite = (product: HotWheelsCar) => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    const handleAddToCart = (product: HotWheelsCar) => {
        addToCart(product);
        success('Produto adicionado ao carrinho!', product.name);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando produtos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Erro ao carregar produtos: {error}</p>
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
        <div className="min-h-screen">

            {/* Lançamentos Section - Grid mais compacto */}
            <section className="bg-white min-h-screen">
                < div className="container mx-auto px-4 py-6" >
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Lançamentos</h2>
                        <p className="text-gray-600 text-sm">Novos produtos adicionados recentemente</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {newReleases.map((product) => (
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
                                        <h3 className="font-semibold text-gray-900 mb-1.5 text-center line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
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
                                        <div className="text-2xl font-bold text-gray-900 mb-0.5">
                                            R$ {product.price.toFixed(2).replace('.', ',')}
                                        </div>
                                        {product.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through mb-0.5">
                                                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                                            </div>
                                        )}
                                        <div className="text-sm text-cyan-600 font-medium">
                                            até 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')}
                                        </div>
                                        <div className="text-sm text-cyan-600">
                                            ou R$ {(product.price * 0.95).toFixed(2).replace('.', ',')} via Pix
                                        </div>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="text-center mb-2">
                                        {product.inStock ? (
                                            <span className="text-green-600 text-sm font-medium">Em estoque</span>
                                        ) : (
                                            <span className="text-red-600 text-sm font-medium">Esgotado</span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={!product.inStock}
                                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </section >


        </div >
    );
};

export default Home; 