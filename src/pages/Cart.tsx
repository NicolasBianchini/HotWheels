import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
    items: CartItem[];
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
}

const Cart = ({ items, updateQuantity, removeItem }: CartProps) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-4 section-padding">
                    <div className="text-center">
                        <div className="bg-white rounded-2xl shadow-sm border border-hotwheel-gray-200 p-12 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-hotwheel-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🛒</span>
                            </div>
                            <h1 className="text-2xl font-bold text-corporate mb-4">Carrinho Vazio</h1>
                            <p className="text-subtitle mb-6">Explore nosso catálogo e adicione produtos incríveis ao seu carrinho.</p>
                            <a
                                href="/catalogo"
                                className="btn-primary inline-block"
                            >
                                Ver Catálogo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 section-padding">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-corporate mb-4">Seu Carrinho</h1>
                    <p className="text-subtitle">Revise seus itens e finalize sua compra</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="card-corporate p-6">
                                <div className="flex items-center gap-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl text-corporate mb-1">{item.name}</h3>
                                        <p className="text-subtitle text-sm mb-2 font-medium">{item.series} • {item.year}</p>
                                        <p className="text-hotwheel-primary font-bold text-xl">
                                            R$ {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 rounded-lg bg-hotwheel-gray-100 hover:bg-hotwheel-gray-200 text-hotwheel-gray-700 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="mx-3 font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 rounded-lg bg-hotwheel-gray-100 hover:bg-hotwheel-gray-200 text-hotwheel-gray-700 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="card-corporate p-8 sticky top-8">
                            <h2 className="font-bold text-2xl text-corporate mb-6">Resumo do Pedido</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-subtitle">
                                    <span className="font-medium">Subtotal:</span>
                                    <span className="font-semibold">R$ {total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-subtitle">
                                    <span className="font-medium">Frete:</span>
                                    <span className="font-semibold text-green-600">Grátis</span>
                                </div>
                                <hr className="border-hotwheel-gray-200" />
                                <div className="flex justify-between font-bold text-xl">
                                    <span className="text-corporate">Total:</span>
                                    <span className="text-hotwheel-primary">R$ {total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="btn-primary w-full text-lg">
                                Finalizar Compra
                            </button>
                            <p className="text-xs text-hotwheel-gray-500 text-center mt-4">
                                Pagamento 100% seguro
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart; 