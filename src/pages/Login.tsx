import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { LoginFormData } from '../types';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Preencha todos os campos');
            return;
        }

        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro no login');
        }
    };

    return (
        <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-hotwheel-gray-200 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-hotwheel-primary to-hotwheel-red rounded-xl flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-white font-racing text-2xl">HW</span>
                        </div>
                        <h2 className="text-3xl font-bold text-corporate">Entrar na sua conta</h2>
                        <p className="mt-3 text-subtitle">
                            Ou{' '}
                            <Link
                                to="/registro"
                                className="font-semibold text-hotwheel-primary hover:text-hotwheel-red transition-colors"
                            >
                                crie uma nova conta
                            </Link>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-corporate mb-2">
                                    E-mail
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-hotwheel-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-500 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-corporate mb-2">
                                    Senha
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-hotwheel-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-500 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm"
                                        placeholder="Sua senha"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-hotwheel-gray-400 hover:text-hotwheel-gray-600 focus:outline-none transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Entrando...
                                    </div>
                                ) : (
                                    'Entrar'
                                )}
                            </button>
                        </div>

                        {/* Footer Links */}
                        <div className="text-center">
                            <a href="#" className="text-sm font-medium text-hotwheel-primary hover:text-hotwheel-red transition-colors">
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </form>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-sm text-subtitle hover:text-corporate transition-colors font-medium"
                    >
                        ← Voltar para a loja
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login; 