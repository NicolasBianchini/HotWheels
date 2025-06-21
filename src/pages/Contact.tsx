import { Mail, Phone, Instagram, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode implementar o envio do formulário
        console.log('Formulário enviado:', formData);
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-corporate mb-6">Fale Conosco</h1>
                        <p className="text-xl text-subtitle max-w-3xl mx-auto">
                            Estamos aqui para ajudar! Entre em contato conosco através de qualquer canal
                            e nossa equipe responderá o mais breve possível.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="card-corporate p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-hotwheel-primary to-hotwheel-red rounded-xl flex items-center justify-center">
                                    <Send className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-corporate">Envie sua Mensagem</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-corporate mb-2">
                                            Nome Completo *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-hotwheel-gray-300 rounded-lg focus:ring-2 focus:ring-hotwheel-primary focus:border-transparent transition-all"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-corporate mb-2">
                                            E-mail *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-hotwheel-gray-300 rounded-lg focus:ring-2 focus:ring-hotwheel-primary focus:border-transparent transition-all"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-corporate mb-2">
                                            Telefone/WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-hotwheel-gray-300 rounded-lg focus:ring-2 focus:ring-hotwheel-primary focus:border-transparent transition-all"
                                            placeholder="(51) 90000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-corporate mb-2">
                                            Assunto *
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-hotwheel-gray-300 rounded-lg focus:ring-2 focus:ring-hotwheel-primary focus:border-transparent transition-all"
                                        >
                                            <option value="">Selecione um assunto</option>
                                            <option value="duvida-produto">Dúvida sobre produto</option>
                                            <option value="pedido">Informações sobre pedido</option>
                                            <option value="troca-devolucao">Troca/Devolução</option>
                                            <option value="parcerias">Parcerias</option>
                                            <option value="sugestao">Sugestão</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-corporate mb-2">
                                        Mensagem *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-hotwheel-gray-300 rounded-lg focus:ring-2 focus:ring-hotwheel-primary focus:border-transparent transition-all resize-none"
                                        placeholder="Digite sua mensagem aqui..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-hotwheel-primary to-hotwheel-red text-white py-4 px-8 rounded-lg font-semibold hover:from-hotwheel-red hover:to-hotwheel-primary transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Enviar Mensagem
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* Contact Cards */}
                            <div className="card-corporate p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-corporate">WhatsApp</h3>
                                        <p className="text-subtitle">(51) 90000-0000</p>
                                    </div>
                                </div>
                                <p className="text-sm text-subtitle">
                                    Fale conosco direto pelo WhatsApp para atendimento mais rápido
                                </p>
                            </div>

                            <div className="card-corporate p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-corporate">E-mail</h3>
                                        <p className="text-subtitle">contato@hotwheels.rafis.com</p>
                                    </div>
                                </div>
                                <p className="text-sm text-subtitle">
                                    Envie suas dúvidas por e-mail e responderemos em até 24h
                                </p>
                            </div>

                            <div className="card-corporate p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                                        <Instagram className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-corporate">Instagram</h3>
                                        <p className="text-subtitle">@hotwheels.rafis</p>
                                    </div>
                                </div>
                                <p className="text-sm text-subtitle">
                                    Acompanhe nossas novidades e entre em contato via direct
                                </p>
                                <a
                                    href="https://www.instagram.com/hotwheels.rafis/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-3 text-hotwheel-primary hover:text-hotwheel-red transition-colors font-medium"
                                >
                                    Seguir no Instagram →
                                </a>
                            </div>

                            {/* Business Hours */}
                            <div className="card-corporate p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h3 className="font-bold text-corporate">Horário de Atendimento</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-subtitle">Segunda a Sexta</span>
                                        <span className="font-medium text-corporate">9h às 18h</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-subtitle">Sábado</span>
                                        <span className="font-medium text-corporate">9h às 13h</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-subtitle">Domingo</span>
                                        <span className="font-medium text-corporate">Fechado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-corporate mb-4">Perguntas Frequentes</h2>
                            <p className="text-subtitle text-lg">
                                Confira as dúvidas mais comuns dos nossos clientes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="card-corporate p-6">
                                <h3 className="font-bold text-corporate mb-3">Como posso fazer um pedido?</h3>
                                <p className="text-subtitle">
                                    Você pode fazer pedidos através do nosso site, WhatsApp ou Instagram.
                                    Nossa equipe estará sempre disponível para ajudar.
                                </p>
                            </div>

                            <div className="card-corporate p-6">
                                <h3 className="font-bold text-corporate mb-3">Vocês entregam em todo o Brasil?</h3>
                                <p className="text-subtitle">
                                    Sim! Fazemos entregas para todo o território nacional via Correios
                                    com rastreamento completo.
                                </p>
                            </div>

                            <div className="card-corporate p-6">
                                <h3 className="font-bold text-corporate mb-3">Como garantem a autenticidade?</h3>
                                <p className="text-subtitle">
                                    Todos os produtos passam por verificação rigorosa. Trabalhamos apenas
                                    com Hot Wheels originais da Mattel.
                                </p>
                            </div>

                            <div className="card-corporate p-6">
                                <h3 className="font-bold text-corporate mb-3">Posso trocar ou devolver?</h3>
                                <p className="text-subtitle">
                                    Sim, temos política de trocas e devoluções. Consulte nossa página
                                    específica para mais detalhes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 