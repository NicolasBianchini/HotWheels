import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hotwheel-primary mx-auto"></div>
                    <p className="text-hotwheel-gray-600 mt-4 text-center">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin()) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-sm border border-hotwheel-gray-200 p-12 max-w-md mx-auto text-center">
                    <div className="w-16 h-16 bg-hotwheel-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">🔒</span>
                    </div>
                    <h1 className="text-2xl font-bold text-corporate mb-4">Acesso Negado</h1>
                    <p className="text-hotwheel-gray-600 mb-6">
                        Você não tem permissão para acessar esta área. Entre em contato com um administrador.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-primary"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute; 