import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-hotwheel-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo e descrição */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-hotwheel-primary to-hotwheel-red rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-racing text-xl">HW</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl">Hot Wheels Rafis</h3>
                                <p className="text-sm text-hotwheel-gray-400 font-medium">Collection Marketplace</p>
                            </div>
                        </div>
                        <p className="text-hotwheel-gray-300 mb-6 max-w-md leading-relaxed">
                            Marketplace especializado em Hot Wheels raros e colecionáveis. Mais de 10 anos de experiência
                            conectando colecionadores com as peças dos seus sonhos. Autenticidade e qualidade garantidas.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="https://www.instagram.com/hotwheels.rafis/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-hotwheel-gray-800 hover:bg-hotwheel-primary text-hotwheel-gray-400 hover:text-white transition-all rounded-lg"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:contato@hotwheelsrafis.com.br"
                                className="p-3 bg-hotwheel-gray-800 hover:bg-hotwheel-primary text-hotwheel-gray-400 hover:text-white transition-all rounded-lg"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="tel:+5511999999999"
                                className="p-3 bg-hotwheel-gray-800 hover:bg-hotwheel-primary text-hotwheel-gray-400 hover:text-white transition-all rounded-lg"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links rápidos */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Navegação</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-hotwheel-gray-300 hover:text-hotwheel-primary transition-colors font-medium">
                                    Início
                                </a>
                            </li>
                            <li>
                                <a href="/catalogo" className="text-hotwheel-gray-300 hover:text-hotwheel-primary transition-colors font-medium">
                                    Catálogo
                                </a>
                            </li>
                            <li>
                                <a href="/sobre" className="text-hotwheel-gray-300 hover:text-hotwheel-primary transition-colors font-medium">
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a href="/carrinho" className="text-hotwheel-gray-300 hover:text-hotwheel-primary transition-colors font-medium">
                                    Carrinho
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Contato</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-hotwheel-gray-800 rounded-lg">
                                    <Phone className="w-4 h-4 text-hotwheel-primary" />
                                </div>
                                <span className="text-hotwheel-gray-300 font-medium">(11) 99999-9999</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-hotwheel-gray-800 rounded-lg">
                                    <Mail className="w-4 h-4 text-hotwheel-primary" />
                                </div>
                                <span className="text-hotwheel-gray-300 font-medium">contato@hotwheelsrafis.com.br</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-hotwheel-gray-800 rounded-lg">
                                    <MapPin className="w-4 h-4 text-hotwheel-primary" />
                                </div>
                                <span className="text-hotwheel-gray-300 font-medium">Porto Alegre, RS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-hotwheel-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-hotwheel-gray-400 text-sm mb-4 md:mb-0 font-medium">
                            © 2024 Hot Wheels Rafis Collection. Todos os direitos reservados.
                        </p>
                        <div className="text-hotwheel-gray-500 text-sm">
                            <span>Hot Wheels® é marca registrada da Mattel, Inc.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 