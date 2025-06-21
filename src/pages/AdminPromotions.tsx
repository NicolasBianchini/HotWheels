import { Plus, Edit, Trash2 } from 'lucide-react';
import { usePromotions } from '../contexts/PromotionsContext';
import { useNavigate } from 'react-router-dom';

const AdminPromotions = () => {
    const { promotions, deletePromotion } = usePromotions();
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta promoção?')) {
            await deletePromotion(id);
        }
    };

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <h1 className="text-4xl font-bold text-corporate mb-8">Gerenciar Promoções</h1>
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-corporate">Lista de Promoções</h2>
                        <button className="btn-primary flex items-center" onClick={() => navigate('/admin/promocoes/nova')}>
                            <Plus className="w-5 h-5 mr-2" />
                            Nova Promoção
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-hotwheel-gray-200">
                            <thead className="bg-hotwheel-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">Título</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">Descrição</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">Desconto (%)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">Data de Início</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">Data de Término</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-hotwheel-gray-200">
                                {promotions.map((promo) => (
                                    <tr key={promo.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-corporate">{promo.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-hotwheel-gray-500">{promo.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-hotwheel-gray-500">{promo.discountPercentage}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-hotwheel-gray-500">{promo.startDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-hotwheel-gray-500">{promo.endDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-hotwheel-primary hover:text-hotwheel-primary/80 mr-3" onClick={() => navigate(`/admin/promocoes/${promo.id}/editar`)}>
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(promo.id)} className="text-red-600 hover:text-red-900">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPromotions; 