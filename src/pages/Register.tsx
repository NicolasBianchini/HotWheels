import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { RegisterFormData } from '../types';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof RegisterFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterFormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
        }

        if (!formData.email) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setErrors({ email: err instanceof Error ? err.message : 'Erro no cadastro' });
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
                        <h2 className="text-3xl font-bold text-corporate">Criar nova conta</h2>
                        <p className="mt-3 text-subtitle">
                            Ou{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-hotwheel-primary hover:text-hotwheel-red transition-colors"
                            >
                                entre na sua conta existente
                            </Link>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-corporate mb-2">
                                Nome completo
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-hotwheel-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-hotwheel-gray-300 focus:ring-hotwheel-primary focus:border-hotwheel-primary'
                                        } placeholder-hotwheel-gray-500 text-corporate focus:outline-none focus:ring-2 transition-all sm:text-sm`}
                                    placeholder="Seu nome completo"
                                />
                            </div>
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                        </div>

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
                                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-hotwheel-gray-300 focus:ring-hotwheel-primary focus:border-hotwheel-primary'
                                        } placeholder-hotwheel-gray-500 text-corporate focus:outline-none focus:ring-2 transition-all sm:text-sm`}
                                    placeholder="seu@email.com"
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
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
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-hotwheel-gray-300 focus:ring-hotwheel-primary focus:border-hotwheel-primary'
                                        } placeholder-hotwheel-gray-500 text-corporate focus:outline-none focus:ring-2 transition-all sm:text-sm`}
                                    placeholder="Mínimo 6 caracteres"
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
                            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-corporate mb-2">
                                Confirmar senha
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-hotwheel-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-hotwheel-gray-300 focus:ring-hotwheel-primary focus:border-hotwheel-primary'
                                        } placeholder-hotwheel-gray-500 text-corporate focus:outline-none focus:ring-2 transition-all sm:text-sm`}
                                    placeholder="Confirme sua senha"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-hotwheel-gray-400 hover:text-hotwheel-gray-600 focus:outline-none transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Criando conta...
                                    </div>
                                ) : (
                                    'Criar conta'
                                )}
                            </button>
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

export default Register; 