import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import RafaLogo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sobre a Empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br">
                                <img src={RafaLogo} alt="Logo" className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Hot Wheels Rafis</h3>
                                <p className="text-sm text-gray-300">Collection Marketplace</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Marketplace especializado em Hot Wheels raros e colecionáveis.
                            Mais de 10 anos de experiência conectando colecionadores com as peças dos seus sonhos.
                            Autenticidade e qualidade garantidas.
                        </p>
                        <div className="flex space-x-3">
                            <a href="https://www.instagram.com/hotwheels.rafis/" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-700 hover:bg-red-500 rounded flex items-center justify-center transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-700 hover:bg-red-500 rounded flex items-center justify-center transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Navegação */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Navegação</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-red-400 transition-colors text-sm">
                                    Início
                                </Link>
                            </li>
                            <li>
                                <Link to="/contato" className="text-gray-300 hover:text-red-400 transition-colors text-sm">
                                    Contato
                                </Link>
                            </li>
                            <li>
                                <Link to="/pagamento" className="text-gray-300 hover:text-red-400 transition-colors text-sm">
                                    Pagamento
                                </Link>
                            </li>
                            <li>
                                <Link to="/trocas" className="text-gray-300 hover:text-red-400 transition-colors text-sm">
                                    Trocas
                                </Link>
                            </li>
                            <li>
                                <Link to="/favoritos" className="text-gray-300 hover:text-red-400 transition-colors text-sm">
                                    Favoritos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contato</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-gray-300 text-sm">(11) 99999-9999</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-gray-300 text-sm">contato@hotwheelsrafis.com.br</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-gray-300 text-sm">Porto Alegre, RS</span>
                            </div>
                        </div>
                    </div>

                    {/* Formas de Pagamento */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Formas de Pagamento</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Pix */}
                            <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>
                                <span className="text-gray-800 text-sm font-medium">Pix</span>
                            </div>

                            {/* Cartão */}
                            <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                    </svg>
                                </div>
                                <span className="text-gray-800 text-sm font-medium">Cartão</span>
                            </div>

                            {/* Boleto */}
                            <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h8v16z" />
                                    </svg>
                                </div>
                                <span className="text-gray-800 text-sm font-medium">Boleto</span>
                            </div>

                            {/* PayPal */}
                            <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.79A.859.859 0 0 1 5.79 2h8.263c1.26 0 2.438.149 3.44.533 1.002.384 1.781.956 2.288 1.684.507.728.76 1.623.76 2.685 0 .694-.134 1.364-.4 2.008-.267.645-.658 1.216-1.175 1.715-.517.499-1.159.898-1.925 1.196-.766.299-1.631.448-2.594.448H12.38L11.58 18.24a.668.668 0 0 1-.659.568H7.076z" />
                                    </svg>
                                </div>
                                <span className="text-gray-800 text-sm font-medium">PayPal</span>
                            </div>
                        </div>

                        {/* Bandeiras de Cartão */}
                        <div className="space-y-2">
                            <p className="text-sm text-gray-400">Cartões aceitos:</p>
                            <div className="flex space-x-2">
                                <div className="bg-white rounded px-2 py-1">
                                    <span className="text-xs font-bold text-blue-600">VISA</span>
                                </div>
                                <div className="bg-white rounded px-2 py-1">
                                    <span className="text-xs font-bold text-red-600">MASTER</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Linha divisória */}
                <div className="border-t border-gray-700 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © 2025 Hot Wheels Rafis Collection. Todos os direitos reservados.
                        </p>
                        <p className="text-sm text-gray-500">
                            Hot Wheels® é marca registrada da Mattel, Inc.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 