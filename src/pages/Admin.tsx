import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductsContext';
import { Package, Plus, Edit, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

const Admin = () => {
    const { user } = useAuth();
    const { products, loading } = useProducts();
    const [stats] = useState({
        totalProducts: products.length,
        inStock: products.filter(p => p.inStock).length,
        outOfStock: products.filter(p => !p.inStock).length,
        totalValue: products.reduce((sum, p) => sum + p.price, 0),
        averagePrice: products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0,
        featuredProducts: products.filter(p => p.featured).length
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hotwheel-primary mx-auto"></div>
                    <p className="text-hotwheel-gray-600 mt-4 text-center">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-corporate mb-2">Painel Administrativo</h1>
                    <p className="text-subtitle text-lg">
                        Bem-vindo, {user?.name}! Gerencie produtos e monitore estatísticas.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Link
                        to="/admin/produtos/novo"
                        className="bg-gradient-to-br from-hotwheel-primary to-hotwheel-red text-white rounded-xl p-6 card-hover group"
                    >
                        <div className="flex items-center mb-4">
                            <Plus className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold">Novo Produto</span>
                        </div>
                        <p className="text-hotwheel-gray-100">Adicionar novo carrinho ao catálogo</p>
                    </Link>

                    <Link
                        to="/admin/produtos"
                        className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 card-hover group"
                    >
                        <div className="flex items-center mb-4">
                            <Package className="w-8 h-8 mr-3 text-hotwheel-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-corporate">Gerenciar</span>
                        </div>
                        <p className="text-subtitle">Editar produtos existentes</p>
                    </Link>

                    <Link
                        to="/admin/promocoes"
                        className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 card-hover group"
                    >
                        <div className="flex items-center mb-4">
                            <TrendingUp className="w-8 h-8 mr-3 text-hotwheel-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-corporate">Promoções</span>
                        </div>
                        <p className="text-subtitle">Configurar ofertas especiais</p>
                    </Link>

                    <Link
                        to="/admin/usuarios"
                        className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 card-hover group"
                    >
                        <div className="flex items-center mb-4">
                            <BarChart3 className="w-8 h-8 mr-3 text-hotwheel-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-corporate">Usuários</span>
                        </div>
                        <p className="text-subtitle">Gerenciar usuários e permissões</p>
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-corporate">Total de Produtos</h3>
                            <Package className="w-6 h-6 text-hotwheel-primary" />
                        </div>
                        <p className="text-3xl font-bold text-hotwheel-primary mb-2">{stats.totalProducts}</p>
                        <div className="flex items-center space-x-4 text-sm">
                            <span className="text-green-600">
                                {stats.inStock} em estoque
                            </span>
                            <span className="text-red-600">
                                {stats.outOfStock} esgotados
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-corporate">Valor Total</h3>
                            <DollarSign className="w-6 h-6 text-hotwheel-primary" />
                        </div>
                        <p className="text-3xl font-bold text-hotwheel-primary mb-2">
                            R$ {stats.totalValue.toFixed(2)}
                        </p>
                        <p className="text-sm text-subtitle">
                            Média: R$ {stats.averagePrice.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-corporate">Produtos em Destaque</h3>
                            <TrendingUp className="w-6 h-6 text-hotwheel-primary" />
                        </div>
                        <p className="text-3xl font-bold text-hotwheel-primary mb-2">{stats.featuredProducts}</p>
                        <p className="text-sm text-subtitle">
                            {((stats.featuredProducts / stats.totalProducts) * 100).toFixed(1)}% do catálogo
                        </p>
                    </div>
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-corporate">Produtos Recentes</h3>
                        <Link
                            to="/admin/produtos"
                            className="text-hotwheel-primary hover:text-hotwheel-primary/80 font-medium"
                        >
                            Ver todos
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {products.slice(0, 4).map((product) => (
                            <div key={product.id} className="border border-hotwheel-gray-200 rounded-lg p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                                <h4 className="font-semibold text-corporate text-sm mb-1 line-clamp-1">
                                    {product.name}
                                </h4>
                                <p className="text-xs text-subtitle mb-2">{product.series}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-hotwheel-primary font-bold">
                                        R$ {product.price.toFixed(2)}
                                    </span>
                                    <Link
                                        to={`/admin/produtos/${product.id}/editar`}
                                        className="text-hotwheel-gray-600 hover:text-hotwheel-primary"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin; 