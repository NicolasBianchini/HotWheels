import { Link } from 'react-router-dom';
import { Star, Truck, Shield, Clock } from 'lucide-react';
import { hotWheelsCars } from '../data/cars';

const Home = () => {
    const featuredCars = hotWheelsCars.filter(car => car.featured);

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            {/* Hero Section */}
            <section className="gradient-subtle">
                <div className="container mx-auto px-4 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="mb-6">
                                <span className="inline-block bg-hotwheel-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    🏁 Marketplace Oficial
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-corporate leading-tight">
                                Hot Wheels
                                <span className="block text-hotwheel-primary">Rafis Collection</span>
                            </h1>
                            <p className="text-xl mb-8 text-subtitle max-w-lg">
                                O marketplace especializado em Hot Wheels raros e colecionáveis.
                                Edições limitadas, Treasure Hunts e peças exclusivas para colecionadores sérios.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/catalogo"
                                    className="btn-primary text-lg"
                                >
                                    Explorar Catálogo
                                </Link>
                                <a
                                    href="https://www.instagram.com/hotwheels.rafis/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline text-lg"
                                >
                                    Seguir no Instagram
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative w-full max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-hotwheel-primary to-hotwheel-accent rounded-2xl transform rotate-6 opacity-20"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                    alt="Hot Wheels Collection"
                                    className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                        <span className="text-sm font-semibold text-hotwheel-gray-900">4.9/5</span>
                                    </div>
                                    <p className="text-xs text-hotwheel-gray-600">1000+ clientes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padding bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-corporate mb-4">Por que escolher a Rafis Collection?</h2>
                        <p className="text-subtitle max-w-2xl mx-auto">Somos especialistas em Hot Wheels há mais de 10 anos, oferecendo o melhor atendimento e produtos de qualidade.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="card-corporate p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-hotwheel-primary to-hotwheel-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Truck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-corporate">Entrega Expressa</h3>
                            <p className="text-subtitle">Envio seguro em 24h para todo o Brasil com embalagem especial</p>
                        </div>
                        <div className="card-corporate p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-hotwheel-accent to-hotwheel-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-corporate">Autenticidade Garantida</h3>
                            <p className="text-subtitle">Todos os produtos são originais e passam por verificação de qualidade</p>
                        </div>
                        <div className="card-corporate p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-hotwheel-primary to-hotwheel-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-corporate">Coleção Premium</h3>
                            <p className="text-subtitle">Apenas peças em estado mint ou near mint para colecionadores exigentes</p>
                        </div>
                        <div className="card-corporate p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-hotwheel-red to-hotwheel-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-corporate">Sempre Atualizado</h3>
                            <p className="text-subtitle">Novos lançamentos e raridades adicionados semanalmente</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-padding bg-hotwheel-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-corporate mb-4">Produtos em Destaque</h2>
                        <p className="text-subtitle text-lg max-w-2xl mx-auto">Peças raras e exclusivas selecionadas especialmente para colecionadores que buscam o melhor</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredCars.map((car) => (
                            <div key={car.id} className="card-corporate overflow-hidden card-hover">
                                <div className="relative">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-hotwheel-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            {car.rarity}
                                        </span>
                                    </div>
                                    {car.originalPrice && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-hotwheel-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                OFERTA
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl mb-2 text-corporate">{car.name}</h3>
                                    <p className="text-subtitle text-sm mb-2 font-medium">{car.series} • {car.year}</p>
                                    <p className="text-subtitle text-sm mb-6 line-clamp-2">{car.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {car.originalPrice && (
                                                <span className="text-hotwheel-gray-400 line-through text-sm mr-2">
                                                    R$ {car.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                            <span className="text-2xl font-bold text-hotwheel-primary">
                                                R$ {car.price.toFixed(2)}
                                            </span>
                                        </div>
                                        <Link
                                            to={`/produto/${car.id}`}
                                            className="btn-primary"
                                        >
                                            Ver Detalhes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/catalogo"
                            className="btn-primary text-lg px-8"
                        >
                            Ver Catálogo Completo
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-hotwheel-primary to-hotwheel-accent rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Fique por Dentro das Novidades</h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Siga nosso Instagram para acompanhar as últimas aquisições, lançamentos exclusivos e promoções especiais para colecionadores!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://www.instagram.com/hotwheels.rafis/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-hotwheel-primary hover:bg-hotwheel-gray-100 font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 text-lg"
                            >
                                📱 @hotwheels.rafis
                            </a>
                            <Link
                                to="/sobre"
                                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-hotwheel-primary font-semibold py-3 px-8 rounded-lg transition-all text-lg"
                            >
                                Sobre Nós
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 