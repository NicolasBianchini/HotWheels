import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import type { HotWheelsCar } from '../types';

interface ProductFormData extends Omit<HotWheelsCar, 'year' | 'price' | 'originalPrice' | 'stock'> {
    year: number | string;
    price: number | string;
    originalPrice?: number | string;
    stock: number | string;
}

const AdminProductEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, updateProduct, loading: productsLoading } = useProducts();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProductFormData | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const product = products.find(p => p.id === id);
        if (product) {
            setFormData({
                ...product,
                year: product.year,
                price: product.price === 0 ? '' : String(product.price).replace('.', ','),
                originalPrice: product.originalPrice === undefined ? '' : String(product.originalPrice).replace('.', ','),
                stock: product.stock === 0 ? '' : String(product.stock),
                featured: product.featured || false,
            });
            setImagePreview(null);
        } else {
            alert('Produto não encontrado');
            navigate('/admin/produtos');
        }
    }, [id, products, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData(prev => {
                if (!prev) return prev;
                if (name === 'inStock') {
                    if (!target.checked) {
                        return { ...prev, inStock: false, stock: 0 };
                    }
                    return { ...prev, inStock: true, stock: prev.stock === 0 ? 1 : prev.stock };
                }
                return { ...prev, [name]: target.checked };
            });
        } else {
            setFormData(prev => prev ? { ...prev, [name]: value } : prev);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        setLoading(true);
        try {
            const dataToSend: HotWheelsCar = {
                id: formData.id,
                name: formData.name,
                brand: formData.brand,
                series: formData.series,
                year: typeof formData.year === 'string' && formData.year === '' ? 0 : Number(formData.year),
                price: typeof formData.price === 'string' && formData.price === '' ? 0 : Number(String(formData.price).replace(',', '.')),
                image: formData.image,
                description: formData.description,
                condition: formData.condition,
                category: formData.category,
                color: formData.color,
                inStock: formData.inStock,
                stock: typeof formData.stock === 'string' && formData.stock === '' ? 0 : Number(formData.stock),
                featured: formData.featured,
                rarity: formData.rarity,
            };

            if (formData.originalPrice && typeof formData.originalPrice === 'string' && formData.originalPrice !== '') {
                dataToSend.originalPrice = Number(String(formData.originalPrice).replace(',', '.'));
            } else if (typeof formData.originalPrice === 'number') {
                dataToSend.originalPrice = formData.originalPrice;
            }
            await updateProduct(formData.id, dataToSend);
            alert('Produto atualizado com sucesso!');
            navigate('/admin/produtos');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (productsLoading || !formData) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hotwheel-primary mx-auto"></div>
                    <p className="text-hotwheel-gray-600 mt-4 text-center">Carregando produto...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <h1 className="text-4xl font-bold text-corporate mb-8">Editar Produto</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Marca</label>
                            <select
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                            >
                                <option value="Hot Wheels">Hot Wheels</option>
                                <option value="Mini GT">Mini GT</option>
                                <option value="Auto World">Auto World</option>
                                <option value="Tarmac Works">Tarmac Works</option>
                                <option value="Auto Art">Auto Art</option>
                                <option value="Jada">Jada</option>
                                <option value="Burago">Burago</option>
                                <option value="Almost Real">Almost Real</option>
                                <option value="Pop Race">Pop Race</option>
                                <option value="Tiny">Tiny</option>
                                <option value="Inno 64">Inno 64</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Nome</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Série</label>
                            <input
                                type="text"
                                name="series"
                                value={formData.series}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Ano</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Preço</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                inputMode="decimal"
                                pattern="^\d{1,}(,\d{0,2})?$|^\d{1,}(\.\d{0,2})?$"
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                                placeholder="Ex: 13,90"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Preço Original (opcional)</label>
                            <input
                                type="text"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleChange}
                                inputMode="decimal"
                                pattern="^\d{1,}(,\d{0,2})?$|^\d{1,}(\.\d{0,2})?$"
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                                placeholder="Ex: 15,00"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-corporate mb-2">Imagem do Produto (opcional)</label>
                            <input type="file" accept="image/*" onChange={handleImageChange}
                                className="block w-full text-sm text-hotwheel-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-hotwheel-primary/10 file:text-hotwheel-primary hover:file:bg-hotwheel-primary/20 transition" />
                            {imagePreview && (
                                <div className="mt-3 flex justify-center">
                                    <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border border-hotwheel-gray-200 shadow" />
                                </div>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-corporate mb-1">Descrição</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Condição</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                            >
                                <option value="Novo">Novo</option>
                                <option value="Usado - Excelente">Usado - Excelente</option>
                                <option value="Usado - Bom">Usado - Bom</option>
                                <option value="Colecionador">Colecionador</option>
                            </select>
                        </div>
                        {/* Campos específicos para Hot Wheels */}
                        {formData.brand === 'Hot Wheels' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-corporate mb-1">Categoria</label>
                                    <select
                                        name="category"
                                        value={formData.category || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                                    >
                                        <option value="Mainline">Mainline</option>
                                        <option value="Premium">Premium</option>
                                        <option value="Super Treasure Hunt">Super Treasure Hunt</option>
                                        <option value="Treasure Hunt">Treasure Hunt</option>
                                        <option value="Team Transport">Team Transport</option>
                                        <option value="Cargo Carriers">Cargo Carriers</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-corporate mb-1">Raridade</label>
                                    <select
                                        name="rarity"
                                        value={formData.rarity || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                                    >
                                        <option value="Comum">Comum</option>
                                        <option value="Raro">Raro</option>
                                        <option value="Super Raro">Super Raro</option>
                                        <option value="Treasure Hunt">Treasure Hunt</option>
                                    </select>
                                </div>
                            </>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-corporate mb-1">Cor</label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-hotwheel-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotwheel-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-corporate mb-2">Quantidade em Estoque</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData?.stock ?? 0}
                                onChange={handleChange}
                                min={0}
                                required
                                disabled={!formData?.inStock}
                                className={`appearance-none rounded-lg block w-full px-4 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-400 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm ${!formData?.inStock ? 'bg-hotwheel-gray-50 text-hotwheel-gray-400 cursor-not-allowed' : ''}`}
                                placeholder="Ex: 10"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label className="text-sm font-medium text-corporate">Em Estoque</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label className="text-sm font-medium text-corporate">Destaque</label>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                        >
                            {loading ? 'Atualizando...' : 'Atualizar Produto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductEdit; 