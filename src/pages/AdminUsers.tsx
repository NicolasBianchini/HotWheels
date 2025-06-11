import { useState, useEffect } from 'react';
import { Users, Crown, Shield, Calendar } from 'lucide-react';
import { getAllUsers, promoteUserToAdmin, demoteUserFromAdmin, checkUserStats } from '../utils/userManagement';
import type { User } from '../types';

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        admins: 0,
        regularUsers: 0
    });

    const loadUsers = async () => {
        try {
            setLoading(true);
            const [usersData, statsData] = await Promise.all([
                getAllUsers(),
                checkUserStats()
            ]);
            setUsers(usersData);
            setStats(statsData);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            alert('Erro ao carregar usuários');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handlePromoteUser = async (userId: string) => {
        if (window.confirm('Tem certeza que deseja promover este usuário a administrador?')) {
            try {
                await promoteUserToAdmin(userId);
                alert('Usuário promovido com sucesso!');
                loadUsers(); // Recarregar lista
            } catch {
                alert('Erro ao promover usuário');
            }
        }
    };

    const handleDemoteUser = async (userId: string) => {
        if (window.confirm('Tem certeza que deseja remover os privilégios de administrador?')) {
            try {
                await demoteUserFromAdmin(userId);
                alert('Privilégios removidos com sucesso!');
                loadUsers(); // Recarregar lista
            } catch {
                alert('Erro ao remover privilégios');
            }
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hotwheel-primary mx-auto"></div>
                    <p className="text-hotwheel-gray-600 mt-4 text-center">Carregando usuários...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-corporate mb-2">Gerenciar Usuários</h1>
                    <p className="text-subtitle text-lg">
                        Visualize e gerencie os usuários registrados na plataforma
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-corporate">Total de Usuários</h3>
                            <Users className="w-6 h-6 text-hotwheel-primary" />
                        </div>
                        <p className="text-3xl font-bold text-hotwheel-primary">{stats.totalUsers}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-corporate">Administradores</h3>
                            <Crown className="w-6 h-6 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-yellow-500">{stats.admins}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-corporate">Usuários Regulares</h3>
                            <Shield className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-blue-500">{stats.regularUsers}</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-hotwheel-gray-200">
                        <h3 className="text-xl font-bold text-corporate">Lista de Usuários</h3>
                    </div>

                    {users.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-hotwheel-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-hotwheel-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-corporate mb-4">Nenhum usuário encontrado</h3>
                            <p className="text-hotwheel-gray-500">
                                Ainda não há usuários registrados na plataforma.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-hotwheel-gray-200">
                                <thead className="bg-hotwheel-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">
                                            Usuário
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">
                                            Criado em
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-hotwheel-gray-500 uppercase tracking-wider">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-hotwheel-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-hotwheel-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={user.avatar}
                                                        alt={user.name}
                                                    />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-corporate">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-hotwheel-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {user.role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                                                    {user.role === 'user' && <Shield className="w-3 h-3 mr-1" />}
                                                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-hotwheel-gray-900">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2 text-hotwheel-gray-400" />
                                                    {formatDate(user.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {user.role === 'admin' ? (
                                                    <button
                                                        onClick={() => handleDemoteUser(user.id)}
                                                        className="text-red-600 hover:text-red-900 mr-3"
                                                    >
                                                        Remover Admin
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePromoteUser(user.id)}
                                                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                                                    >
                                                        Promover a Admin
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers; 