import { Instagram, Mail, Phone, Award, Shield, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-corporate mb-6">Hot Wheels Rafis Collection</h1>
                        <p className="text-xl text-subtitle max-w-3xl mx-auto">
                            Somos especialistas em Hot Wheels raros e colecionáveis, conectando entusiastas
                            com as peças mais desejadas do mercado há mais de uma década.
                        </p>
                    </div>

                    {/* Story Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-hotwheel-primary to-hotwheel-accent rounded-2xl transform rotate-3 opacity-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Coleção Hot Wheels"
                                className="relative rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-corporate mb-6">Nossa História</h2>
                            <p className="text-subtitle text-lg mb-6 leading-relaxed">
                                A Hot Wheels Rafis Collection nasceu da paixão genuína por colecionismo e da busca
                                incansável pelos carrinhos mais raros e especiais do universo Hot Wheels.
                            </p>
                            <p className="text-subtitle text-lg mb-6 leading-relaxed">
                                Desde nossa fundação em 2010, nos dedicamos exclusivamente a encontrar e oferecer
                                os melhores Hot Wheels para colecionadores exigentes de todo o Brasil, construindo
                                relacionamentos duradouros baseados na confiança e na qualidade.
                            </p>
                            <p className="text-subtitle text-lg leading-relaxed">
                                Nossa missão é simples: conectar colecionadores com os carrinhos dos seus sonhos,
                                oferecendo produtos 100% autênticos, em estado mint/near mint, com a garantia de
                                qualidade que apenas anos de experiência podem proporcionar.
                            </p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-corporate mb-4">Por que somos referência no mercado?</h2>
                            <p className="text-subtitle text-lg max-w-2xl mx-auto">
                                Nossa expertise e dedicação nos tornaram a escolha preferida de colecionadores sérios
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card-corporate p-8 text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-hotwheel-primary to-hotwheel-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <Shield className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-corporate">Autenticidade Garantida</h3>
                                <p className="text-subtitle leading-relaxed">
                                    Todos os nossos Hot Wheels passam por rigorosa verificação de autenticidade.
                                    Trabalhamos apenas com produtos originais da Mattel.
                                </p>
                            </div>

                            <div className="card-corporate p-8 text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-hotwheel-accent to-hotwheel-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <Award className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-corporate">Qualidade Premium</h3>
                                <p className="text-subtitle leading-relaxed">
                                    Selecionamos apenas peças em estado mint ou near mint. Cuidado especial
                                    na conservação, embalagem e envio de cada produto.
                                </p>
                            </div>

                            <div className="card-corporate p-8 text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-hotwheel-red to-hotwheel-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <Heart className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-corporate">Paixão Genuína</h3>
                                <p className="text-subtitle leading-relaxed">
                                    Somos colecionadores ajudando colecionadores. Entendemos a emoção de
                                    encontrar aquela peça especial que faltava na sua coleção.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-hotwheel-gray-200 p-12 mb-20">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-hotwheel-primary mb-2">10+</div>
                                <div className="text-subtitle font-medium">Anos de Experiência</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-hotwheel-primary mb-2">5000+</div>
                                <div className="text-subtitle font-medium">Carrinhos Vendidos</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-hotwheel-primary mb-2">1000+</div>
                                <div className="text-subtitle font-medium">Clientes Satisfeitos</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-hotwheel-primary mb-2">4.9★</div>
                                <div className="text-subtitle font-medium">Avaliação Média</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-gradient-to-r from-hotwheel-primary to-hotwheel-accent text-white rounded-3xl p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">Vamos Conversar?</h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Tem alguma dúvida, está procurando um Hot Wheels específico ou quer saber sobre novidades?
                            Nossa equipe está sempre pronta para ajudar!
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a
                                href="https://www.instagram.com/hotwheels.rafis/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-white text-hotwheel-primary px-8 py-4 rounded-lg font-semibold hover:bg-hotwheel-gray-100 transition-all transform hover:scale-105"
                            >
                                <Instagram className="w-5 h-5" />
                                @hotwheels.rafis
                            </a>
                            <a
                                href="mailto:contato@hotwheelsrafis.com.br"
                                className="flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-hotwheel-primary px-8 py-4 rounded-lg font-semibold transition-all"
                            >
                                <Mail className="w-5 h-5" />
                                E-mail
                            </a>
                            <a
                                href="tel:+5511999999999"
                                className="flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-hotwheel-primary px-8 py-4 rounded-lg font-semibold transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 