import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Package } from 'lucide-react';
import { useProducts } from '../contexts/ProductsContext';
import type { CartItem } from '../types';

interface ProductDetailProps {
    addToCart: (product: CartItem) => void;
}

const ProductDetail = ({ addToCart }: ProductDetailProps) => {
    const { id } = useParams<{ id: string }>();
    const { products } = useProducts();
    const car = products.find(c => c.id === id);

    if (!car) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25">
                <div className="container mx-auto px-4 section-padding">
                    <div className="text-center max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-sm border border-hotwheel-gray-200 p-12">
                            <div className="w-16 h-16 bg-hotwheel-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">❓</span>
                            </div>
                            <h1 className="text-2xl font-bold text-corporate mb-4">Produto não encontrado</h1>
                            <p className="text-subtitle mb-6">O produto que você está procurando não existe ou foi removido.</p>
                            <Link
                                to="/catalogo"
                                className="btn-primary inline-block"
                            >
                                Ver Catálogo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({ ...car, quantity: 1 });
        alert(`${car.name} adicionado ao carrinho!`);
    };

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        to="/catalogo"
                        className="inline-flex items-center gap-2 text-subtitle hover:text-corporate transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao catálogo
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-sm border border-hotwheel-gray-200 p-8">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full rounded-xl"
                            />
                            {car.originalPrice && (
                                <div className="absolute top-4 right-4">
                                    <span className="bg-hotwheel-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        OFERTA
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-corporate mb-4">{car.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-lg text-subtitle font-medium">{car.series}</span>
                                <span className="text-hotwheel-gray-400">•</span>
                                <span className="text-lg text-subtitle font-medium">{car.year}</span>
                            </div>
                            <p className="text-subtitle text-lg leading-relaxed">{car.description}</p>
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                            <div className="flex items-center gap-4 mb-4">
                                {car.originalPrice && (
                                    <span className="text-hotwheel-gray-400 line-through text-xl">
                                        R$ {car.originalPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-4xl font-bold text-hotwheel-primary">
                                    R$ {car.price.toFixed(2)}
                                </span>
                            </div>
                            {car.originalPrice && (
                                <p className="text-green-600 font-semibold">
                                    Você economiza R$ {(car.originalPrice - car.price).toFixed(2)}
                                </p>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 text-center">
                                <Package className="w-8 h-8 text-hotwheel-primary mx-auto mb-3" />
                                <div className="text-sm font-semibold text-corporate mb-1">Condição</div>
                                <div className="text-subtitle">{car.condition}</div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 text-center">
                                <Star className="w-8 h-8 text-hotwheel-accent mx-auto mb-3" />
                                <div className="text-sm font-semibold text-corporate mb-1">Raridade</div>
                                <div className="text-subtitle">{car.rarity}</div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 text-center">
                                <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                <div className="text-sm font-semibold text-corporate mb-1">Status</div>
                                <div className={`font-semibold ${car.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                    {car.inStock ? 'Em estoque' : 'Esgotado'}
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={!car.inStock}
                                className="btn-primary w-full text-xl py-4 disabled:bg-hotwheel-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-none"
                            >
                                {car.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                            </button>
                            {car.inStock && (
                                <p className="text-center text-sm text-hotwheel-gray-500 mt-3">
                                    ✓ Produto autêntico  •  ✓ Frete grátis  •  ✓ Garantia de qualidade
                                </p>
                            )}
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gradient-to-r from-hotwheel-gray-50 to-white rounded-xl border border-hotwheel-gray-200 p-6">
                            <h3 className="font-bold text-lg text-corporate mb-4">Informações de Entrega</h3>
                            <div className="space-y-3 text-subtitle">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-hotwheel-primary rounded-full"></span>
                                    <span>Frete grátis para todo o Brasil</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-hotwheel-primary rounded-full"></span>
                                    <span>Embalagem especial para colecionadores</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-hotwheel-primary rounded-full"></span>
                                    <span>Produto 100% autêntico com certificado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 