import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';
import type { HotWheelsCar } from '../types';

interface FavoritesProps {
    addToCart?: (product: HotWheelsCar) => void;
}

const Favorites = ({ addToCart }: FavoritesProps) => {
    const { favorites, removeFromFavorites, favoritesCount } = useFavorites();

    const handleAddToCart = (product: HotWheelsCar) => {
        if (addToCart) {
            addToCart(product);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    if (favoritesCount === 0) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25">
                <div className="container mx-auto px-4 section-padding">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-5xl font-bold text-corporate mb-6">Meus Favoritos</h1>
                            <p className="text-xl text-subtitle">
                                Seus Hot Wheels favoritos ficarão salvos aqui
                            </p>
                        </div>

                        {/* Empty State */}
                        <div className="text-center py-20">
                            <div className="w-32 h-32 mx-auto mb-8 bg-hotwheel-gray-100 rounded-full flex items-center justify-center">
                                <Heart className="w-16 h-16 text-hotwheel-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-corporate mb-4">Nenhum favorito ainda</h2>
                            <p className="text-subtitle text-lg mb-8 max-w-md mx-auto">
                                Explore nosso catálogo e clique no coração para adicionar Hot Wheels aos seus favoritos
                            </p>
                            <Link
                                to="/catalogo"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-hotwheel-primary to-hotwheel-red text-white px-8 py-4 rounded-lg font-semibold hover:from-hotwheel-red hover:to-hotwheel-primary transition-all transform hover:scale-105"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Explorar Catálogo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-corporate mb-6">Meus Favoritos</h1>
                        <p className="text-xl text-subtitle">
                            {favoritesCount} {favoritesCount === 1 ? 'produto favorito' : 'produtos favoritos'}
                        </p>
                    </div>

                    {/* Actions Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-hotwheel-primary" fill="currentColor" />
                            <span className="text-corporate font-medium">
                                {favoritesCount} favoritos salvos
                            </span>
                        </div>
                        <Link
                            to="/catalogo"
                            className="text-hotwheel-primary hover:text-hotwheel-red transition-colors font-medium"
                        >
                            Continuar comprando →
                        </Link>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-hotwheel-gray-50 overflow-hidden">
                                    <Link to={`/produto/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>

                                    {/* Remove from favorites button */}
                                    <button
                                        onClick={() => removeFromFavorites(product.id)}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-600 transition-all group"
                                        title="Remover dos favoritos"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {product.featured && (
                                            <span className="bg-hotwheel-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                                                Destaque
                                            </span>
                                        )}
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                Oferta
                                            </span>
                                        )}
                                        {!product.inStock && (
                                            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                Esgotado
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <Link to={`/produto/${product.id}`}>
                                        <h3 className="font-semibold text-corporate text-sm mb-2 line-clamp-2 hover:text-hotwheel-primary transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <div className="text-xs text-subtitle mb-3">
                                        <span>{product.series}</span>
                                        {product.year && <span> • {product.year}</span>}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg font-bold text-hotwheel-primary">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <span className="text-sm text-hotwheel-gray-500 line-through">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={!product.inStock}
                                            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${product.inStock
                                                    ? 'bg-hotwheel-primary text-white hover:bg-hotwheel-red'
                                                    : 'bg-hotwheel-gray-200 text-hotwheel-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {product.inStock ? (
                                                <>
                                                    <ShoppingCart className="w-4 h-4 inline mr-1" />
                                                    Adicionar
                                                </>
                                            ) : (
                                                'Esgotado'
                                            )}
                                        </button>

                                        <button
                                            onClick={() => removeFromFavorites(product.id)}
                                            className="p-2 border border-hotwheel-gray-300 rounded-lg hover:border-red-400 hover:text-red-600 transition-all"
                                            title="Remover dos favoritos"
                                        >
                                            <Heart className="w-4 h-4" fill="currentColor" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Continue Shopping CTA */}
                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-hotwheel-primary to-hotwheel-red text-white rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-4">Encontre mais Hot Wheels incríveis!</h2>
                            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                                Explore nosso catálogo completo e descubra novos modelos para adicionar à sua coleção
                            </p>
                            <Link
                                to="/catalogo"
                                className="inline-flex items-center gap-2 bg-white text-hotwheel-primary px-8 py-3 rounded-lg font-semibold hover:bg-hotwheel-gray-100 transition-all"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Ver Catálogo Completo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites; 