import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Camera, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';

const Profile = () => {
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                avatar: user.avatar || ''
            });
            setPreviewUrl(user.avatar || '');
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Por favor, selecione apenas arquivos de imagem');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('A imagem deve ter no máximo 5MB');
                return;
            }

            setSelectedFile(file);

            // Create preview URL
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setError('');
        }
    };

    const uploadImage = async (): Promise<string> => {
        if (!selectedFile || !user) throw new Error('Nenhuma imagem selecionada');

        setUploadingImage(true);

        try {
            // Create a reference to the file location
            const imageRef = ref(storage, `avatars/${user.id}/${Date.now()}_${selectedFile.name}`);

            // Upload the file
            await uploadBytes(imageRef, selectedFile);

            // Get the download URL
            const downloadURL = await getDownloadURL(imageRef);
            return downloadURL;
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            let avatarUrl = formData.avatar;

            // Upload new image if one was selected
            if (selectedFile) {
                avatarUrl = await uploadImage();
            }

            // Update Firebase Auth profile
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: formData.name
                });
            }

            // Update Firestore document
            const userDocRef = doc(db, 'users', user.id);
            await updateDoc(userDocRef, {
                name: formData.name,
                avatar: avatarUrl
            });

            // Update local form data and state
            setFormData(prev => ({ ...prev, avatar: avatarUrl }));
            setPreviewUrl(avatarUrl);
            setSelectedFile(null);

            // Clear any preview URL that was created locally
            if (selectedFile && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }

            setSuccess('Perfil atualizado com sucesso!');

            // Force refresh user data in context
            await refreshUser();

        } catch (err) {
            console.error('Error updating profile:', err);

            // More specific error messages
            let errorMessage = 'Erro ao atualizar perfil. Tente novamente.';

            const error = err as { code?: string; message?: string };

            if (error.code === 'storage/unauthorized') {
                errorMessage = 'Erro de permissão no upload da imagem.';
            } else if (error.code === 'firestore/permission-denied') {
                errorMessage = 'Erro de permissão no banco de dados.';
            } else if (error.code === 'storage/quota-exceeded') {
                errorMessage = 'Limite de armazenamento excedido.';
            } else if (error.message && error.message.includes('Network')) {
                errorMessage = 'Erro de conexão. Verifique sua internet.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-hotwheel-gray-25 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-corporate mb-4">Acesso Negado</h2>
                    <p className="text-subtitle mb-6">Você precisa estar logado para acessar esta página.</p>
                    <Link to="/login" className="btn-primary">
                        Fazer Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-hotwheel-gray-25 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm font-medium text-hotwheel-gray-600 hover:text-hotwheel-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para a loja
                    </Link>
                    <h1 className="text-3xl font-bold text-corporate">Editar Perfil</h1>
                    <p className="mt-2 text-subtitle">Atualize suas informações pessoais</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-hotwheel-gray-200 p-8">
                    {/* Avatar Section */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt={formData.name}
                                    className="w-24 h-24 rounded-full object-cover ring-4 ring-hotwheel-gray-200 shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-hotwheel-primary rounded-full flex items-center justify-center ring-4 ring-hotwheel-gray-200 shadow-lg">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadingImage}
                                className="absolute bottom-0 right-0 bg-hotwheel-primary hover:bg-hotwheel-red rounded-full p-2 shadow-lg transition-colors disabled:opacity-50"
                            >
                                {uploadingImage ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Camera className="w-4 h-4 text-white" />
                                )}
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                        <p className="text-sm text-hotwheel-gray-600 mt-4">
                            Clique na câmera para escolher uma nova foto
                        </p>
                        {selectedFile && (
                            <p className="text-xs text-hotwheel-primary mt-2 font-medium">
                                📷 {selectedFile.name} selecionado
                            </p>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-hotwheel-gray-300 placeholder-hotwheel-gray-500 text-corporate focus:outline-none focus:ring-2 focus:ring-hotwheel-primary focus:border-hotwheel-primary transition-all sm:text-sm"
                                    placeholder="Seu nome completo"
                                />
                            </div>
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
                                    disabled
                                    value={formData.email}
                                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-hotwheel-gray-300 bg-hotwheel-gray-50 text-hotwheel-gray-500 cursor-not-allowed sm:text-sm"
                                />
                            </div>
                            <p className="mt-2 text-xs text-hotwheel-gray-500">
                                O email não pode ser alterado por motivos de segurança
                            </p>
                        </div>



                        {/* Messages */}
                        {success && (
                            <div className="text-green-600 text-sm text-center bg-green-50 border border-green-200 p-3 rounded-lg">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || uploadingImage}
                                className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading || uploadingImage ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        {uploadingImage ? 'Enviando foto...' : 'Salvando...'}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <Save className="w-5 h-5 mr-2" />
                                        Salvar Alterações
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile; 