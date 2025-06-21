import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import { useNotifications } from '../contexts/NotificationContext';
import type { HotWheelsCar } from '../types';

const AdminProductNew = () => {
    const navigate = useNavigate();
    const { addProduct } = useProducts();
    const { success, error } = useNotifications();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        brand: 'Hot Wheels' as HotWheelsCar['brand'],
        series: '',
        year: '' as string | number,
        price: '' as string | number,
        originalPrice: '' as string | number,
        image: '',
        description: '',
        condition: 'Novo' as HotWheelsCar['condition'],
        category: 'Mainline' as HotWheelsCar['category'],
        color: '',
        inStock: true,
        stock: '' as string | number,
        featured: false,
        rarity: 'Comum' as HotWheelsCar['rarity']
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const isHotWheels = formData.brand === 'Hot Wheels';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: target.checked }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: (name === 'year' || name === 'price' || name === 'originalPrice' || name === 'stock') ? value : value
            }));
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
        setLoading(true);
        try {
            // Prepare data with proper type conversions
            const { originalPrice, ...restFormData } = formData;
            const dataToSend: Omit<HotWheelsCar, 'id'> = {
                ...restFormData,
                year: typeof formData.year === 'string' && formData.year === '' ? 0 : Number(formData.year),
                price: typeof formData.price === 'string' && formData.price === '' ? 0 : Number(String(formData.price).replace(',', '.')),
                stock: typeof formData.stock === 'string' && formData.stock === '' ? 0 : Number(formData.stock),
            };

            // Handle originalPrice conversion
            if (typeof originalPrice === 'string' && originalPrice !== '') {
                dataToSend.originalPrice = Number(String(originalPrice).replace(',', '.'));
            } else if (typeof originalPrice === 'number') {
                dataToSend.originalPrice = originalPrice;
            }

            // Se não for Hot Wheels, remover campos específicos
            if (!isHotWheels) {
                delete dataToSend.category;
                delete dataToSend.rarity;
            }
            await addProduct(dataToSend);
            success('Produto adicionado com sucesso!');
            navigate('/admin/produtos');
        } catch (err) {
            console.error('Erro ao adicionar produto:', err);
            error('Erro ao adicionar produto. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <h1 className="text-4xl font-bold text-corporate mb-8">Novo Produto</h1>
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
                        {isHotWheels && (
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
                        <div>
                            <label className="block text-sm font-semibold text-corporate mb-2">Quantidade em Estoque</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                min={0}
                                required
                                disabled={!formData.inStock}
                                className={`appearance-none rounded-lg block w-full px-4 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-400 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm ${!formData.inStock ? 'bg-hotwheel-gray-50 text-hotwheel-gray-400 cursor-not-allowed' : ''}`}
                                placeholder="Ex: 10"
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                        >
                            {loading ? 'Adicionando...' : 'Adicionar Produto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductNew; 