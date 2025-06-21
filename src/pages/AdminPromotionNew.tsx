import { useState } from 'react';
import { usePromotions } from '../contexts/PromotionsContext';
import { useProducts } from '../contexts/ProductsContext';
import { useNavigate } from 'react-router-dom';

const AdminPromotionNew = () => {
    const { addPromotion } = usePromotions();
    const { products } = useProducts();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        discountPercentage: '',
        startDate: '',
        endDate: '',
        productIds: [] as string[],
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'discountPercentage' ? value : value
        }));
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
            const dataToSend = {
                ...form,
                discountPercentage: typeof form.discountPercentage === 'string' && form.discountPercentage === '' ? 0 : Number(form.discountPercentage),
            };
            await addPromotion(dataToSend);
            navigate('/admin/promocoes');
        } catch {
            alert('Erro ao adicionar promoção.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <h1 className="text-3xl font-bold text-corporate mb-8">Nova Promoção</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6 max-w-xl mx-auto space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-corporate mb-2">Título</label>
                        <input name="title" value={form.title} onChange={handleChange} required
                            className="appearance-none rounded-lg block w-full px-4 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-400 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm"
                            placeholder="Ex: Black Friday Hot Wheels" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-corporate mb-2">Descrição</label>
                        <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                            className="appearance-none rounded-lg block w-full px-4 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-400 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm"
                            placeholder="Detalhes da promoção, condições, etc." />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-corporate mb-2">Desconto (%)</label>
                        <input name="discountPercentage" type="number" min={0} max={100} value={form.discountPercentage} onChange={handleChange} required
                            className="appearance-none rounded-lg block w-full px-4 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-400 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm"
                            placeholder="Ex: 20" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-corporate mb-2">Data de Início</label>
                        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required
                            className="appearance-none rounded-lg block w-full px-4 py-3 border border-hotwheel-gray-300 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-corporate mb-2">Data de Término</label>
                        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required
                            className="appearance-none rounded-lg block w-full px-4 py-3 border border-hotwheel-gray-300 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-corporate mb-2">Imagem da Promoção (opcional)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange}
                            className="block w-full text-sm text-hotwheel-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-hotwheel-primary/10 file:text-hotwheel-primary hover:file:bg-hotwheel-primary/20 transition" />
                        {imagePreview && (
                            <div className="mt-3 flex justify-center">
                                <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border border-hotwheel-gray-200 shadow" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-corporate mb-2">Produtos em Promoção</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-hotwheel-gray-300 rounded-lg px-4 py-3">
                            {products.map((product) => (
                                <label key={product.id} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={product.id}
                                        checked={form.productIds.includes(product.id)}
                                        onChange={e => {
                                            const checked = e.target.checked;
                                            setForm(prev => ({
                                                ...prev,
                                                productIds: checked
                                                    ? [...prev.productIds, product.id]
                                                    : prev.productIds.filter(id => id !== product.id)
                                            }));
                                        }}
                                        className="accent-hotwheel-primary w-4 h-4"
                                    />
                                    <span className="text-corporate text-sm">{product.name} ({product.series} • {product.year})</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="button" className="btn-secondary mr-2" onClick={() => navigate('/admin/promocoes')}>Cancelar</button>
                        <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPromotionNew; 