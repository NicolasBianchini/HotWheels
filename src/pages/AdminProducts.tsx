import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import { Edit, Trash2, Plus, Eye, Search, Filter } from 'lucide-react';
import type { HotWheelsCar } from '../types';

const AdminProducts = () => {
    const { products, loading, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');

    // Filter products based on search and filters
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.series.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        const matchesStock = stockFilter === 'all' ||
            (stockFilter === 'inStock' && product.inStock) ||
            (stockFilter === 'outOfStock' && !product.inStock);

        return matchesSearch && matchesCategory && matchesStock;
    });

    const handleDelete = async (product: HotWheelsCar) => {
        if (window.confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
            try {
                await deleteProduct(product.id);
                alert('Produto excluído com sucesso!');
            } catch {
                alert('Erro ao excluir produto. Tente novamente.');
            }
        }
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
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-corporate mb-2">Gerenciar Produtos</h1>
                        <p className="text-subtitle text-lg">
                            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <Link
                        to="/admin/produtos/novo"
                        className="btn-primary flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Novo Produto
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotwheel-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 border border-hotwheel-gray-300 bg-hotwheel-gray-50 text-hotwheel-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary placeholder-hotwheel-gray-500 text-sm"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotwheel-gray-400 w-4 h-4" />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 border border-hotwheel-gray-300 bg-hotwheel-gray-50 text-hotwheel-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary text-sm appearance-none"
                            >
                                <option value="all">Todas as Categorias</option>
                                <option value="Mainline">Mainline</option>
                                <option value="Premium">Premium</option>
                                <option value="Super Treasure Hunt">Super Treasure Hunt</option>
                                <option value="Treasure Hunt">Treasure Hunt</option>
                                <option value="Team Transport">Team Transport</option>
                                <option value="Cargo Carriers">Cargo Carriers</option>
                            </select>
                        </div>

                        {/* Stock Filter */}
                        <div>
                            <select
                                value={stockFilter}
                                onChange={(e) => setStockFilter(e.target.value)}
                                className="w-full px-4 py-2.5 border border-hotwheel-gray-300 bg-hotwheel-gray-50 text-hotwheel-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary text-sm appearance-none"
                            >
                                <option value="all">Todos os Status</option>
                                <option value="inStock">Em Estoque</option>
                                <option value="outOfStock">Esgotado</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-hotwheel-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">📦</span>
                        </div>
                        <h3 className="text-xl font-bold text-corporate mb-4">Nenhum produto encontrado</h3>
                        <p className="text-hotwheel-gray-500 mb-6">
                            Não há produtos que correspondam aos filtros selecionados.
                        </p>
                        <Link
                            to="/admin/produtos/novo"
                            className="btn-primary inline-block"
                        >
                            Adicionar Primeiro Produto
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-hotwheel-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            {product.rarity}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.inStock
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.inStock ? 'Em Estoque' : 'Esgotado'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2 text-corporate line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-subtitle text-sm mb-4 font-medium">
                                        {product.series} • {product.year}
                                    </p>

                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            {product.originalPrice && (
                                                <span className="text-hotwheel-gray-400 line-through text-sm mr-2">
                                                    R$ {product.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                            <span className="text-xl font-bold text-hotwheel-primary">
                                                R$ {product.price.toFixed(2)}
                                            </span>
                                        </div>
                                        {product.featured && (
                                            <span className="bg-hotwheel-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                DESTAQUE
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/produto/${product.id}`}
                                            className="flex-1 btn-secondary text-sm text-center flex items-center justify-center"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            Ver
                                        </Link>
                                        <Link
                                            to={`/admin/produtos/${product.id}/editar`}
                                            className="flex-1 bg-hotwheel-primary text-white text-sm px-3 py-2 rounded-lg hover:bg-hotwheel-primary/90 transition-colors flex items-center justify-center"
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product)}
                                            className="bg-red-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts; 