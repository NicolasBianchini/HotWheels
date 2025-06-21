import { CreditCard, Smartphone, FileText, Truck, Package, Shield, Clock, MapPin } from 'lucide-react';

const Payment = () => {
    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-corporate mb-6">Meios de Pagamento e Envio</h1>
                        <p className="text-xl text-subtitle max-w-3xl mx-auto">
                            Oferecemos diversas formas de pagamento seguras e opções de envio para todo o Brasil,
                            garantindo que você receba seus Hot Wheels com total segurança.
                        </p>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-corporate mb-4">Formas de Pagamento</h2>
                            <p className="text-subtitle text-lg">
                                Escolha a forma que mais convém para você
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Pix */}
                            <div className="card-corporate p-6 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Smartphone className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-corporate">Pix</h3>
                                <p className="text-subtitle text-sm mb-4">
                                    Pagamento instantâneo, seguro e sem taxas
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-green-700 font-medium text-sm">✓ À vista com desconto</p>
                                    <p className="text-green-700 font-medium text-sm">✓ Confirmação imediata</p>
                                </div>
                            </div>

                            {/* Cartão de Crédito */}
                            <div className="card-corporate p-6 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CreditCard className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-corporate">Cartão de Crédito</h3>
                                <p className="text-subtitle text-sm mb-4">
                                    Visa, Mastercard, Elo e American Express
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-blue-700 font-medium text-sm">✓ Até 12x sem juros</p>
                                    <p className="text-blue-700 font-medium text-sm">✓ Pagamento seguro</p>
                                </div>
                            </div>

                            {/* Cartão de Débito */}
                            <div className="card-corporate p-6 text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CreditCard className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-corporate">Cartão de Débito</h3>
                                <p className="text-subtitle text-sm mb-4">
                                    Débito online direto da sua conta
                                </p>
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                    <p className="text-purple-700 font-medium text-sm">✓ À vista com desconto</p>
                                    <p className="text-purple-700 font-medium text-sm">✓ Aprovação rápida</p>
                                </div>
                            </div>

                            {/* Boleto */}
                            <div className="card-corporate p-6 text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-corporate">Boleto Bancário</h3>
                                <p className="text-subtitle text-sm mb-4">
                                    Pague em qualquer banco ou app
                                </p>
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                    <p className="text-orange-700 font-medium text-sm">✓ Vencimento em 3 dias</p>
                                    <p className="text-orange-700 font-medium text-sm">✓ Sem necessidade de cartão</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Security */}
                        <div className="mt-12 bg-gradient-to-r from-hotwheel-primary to-hotwheel-red text-white rounded-2xl p-8">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <Shield className="w-8 h-8" />
                                <h3 className="text-2xl font-bold">Segurança Garantida</h3>
                            </div>
                            <p className="text-center text-lg opacity-90 max-w-3xl mx-auto">
                                Todos os pagamentos são processados com certificado SSL e criptografia de ponta a ponta.
                                Seus dados estão completamente protegidos em nossa plataforma.
                            </p>
                        </div>
                    </div>

                    {/* Shipping Options */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-corporate mb-4">Opções de Envio</h2>
                            <p className="text-subtitle text-lg">
                                Entregamos em todo o Brasil com rastreamento completo
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Correios PAC */}
                            <div className="card-corporate p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Package className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-corporate">Correios PAC</h3>
                                        <p className="text-subtitle">Econômico e seguro</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-subtitle">5 a 10 dias úteis</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-subtitle">Todo o Brasil</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-subtitle">Rastreamento incluído</span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-blue-700 font-medium text-sm">A partir de R$ 15,00</p>
                                </div>
                            </div>

                            {/* Correios SEDEX */}
                            <div className="card-corporate p-8 border-2 border-hotwheel-primary">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                            <Truck className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-corporate">Correios SEDEX</h3>
                                            <p className="text-subtitle">Rápido e confiável</p>
                                        </div>
                                    </div>
                                    <span className="bg-hotwheel-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                                        RECOMENDADO
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-red-600" />
                                        <span className="text-sm text-subtitle">1 a 3 dias úteis</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-600" />
                                        <span className="text-sm text-subtitle">Todo o Brasil</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-red-600" />
                                        <span className="text-sm text-subtitle">Rastreamento + Seguro</span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                                    <p className="text-red-700 font-medium text-sm">A partir de R$ 25,00</p>
                                </div>
                            </div>

                            {/* Retirada Local */}
                            <div className="card-corporate p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-corporate">Retirada Local</h3>
                                        <p className="text-subtitle">Retire pessoalmente</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-subtitle">Imediato após confirmação</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-subtitle">Porto Alegre - RS</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-subtitle">Sem custo de frete</span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                                    <p className="text-green-700 font-medium text-sm">GRÁTIS</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Packaging */}
                        <div className="card-corporate p-8">
                            <h3 className="text-2xl font-bold text-corporate mb-6">Embalagem Especial</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-hotwheel-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-corporate">Proteção Máxima</h4>
                                        <p className="text-subtitle text-sm">Bubble wrap e caixas rígidas para proteger seus Hot Wheels</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-hotwheel-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-corporate">Identificação Clara</h4>
                                        <p className="text-subtitle text-sm">Etiquetas com informações completas do destinatário</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-hotwheel-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-corporate">Lacre de Segurança</h4>
                                        <p className="text-subtitle text-sm">Fita adesiva especial para garantir que chegue intacto</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tracking */}
                        <div className="card-corporate p-8">
                            <h3 className="text-2xl font-bold text-corporate mb-6">Acompanhe seu Pedido</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-hotwheel-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-corporate">Código de Rastreamento</h4>
                                        <p className="text-subtitle text-sm">Enviamos o código assim que o pedido for postado</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-hotwheel-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-corporate">Atualizações em Tempo Real</h4>
                                        <p className="text-subtitle text-sm">Acompanhe pelo site dos Correios ou nosso WhatsApp</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-hotwheel-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-corporate">Confirmação de Entrega</h4>
                                        <p className="text-subtitle text-sm">Notificação quando seu pedido for entregue</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-corporate mb-6 flex items-center gap-3">
                            <span className="text-yellow-600">⚠️</span>
                            Informações Importantes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-corporate mb-2">Prazos de Envio</h4>
                                <p className="text-subtitle text-sm">
                                    Os prazos começam a contar após a confirmação do pagamento.
                                    Pedidos feitos após 14h são processados no próximo dia útil.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-corporate mb-2">Frete Grátis</h4>
                                <p className="text-subtitle text-sm">
                                    Oferecemos frete grátis para compras acima de R$ 200,00
                                    via PAC para todo o Brasil.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-corporate mb-2">Endereço de Entrega</h4>
                                <p className="text-subtitle text-sm">
                                    Verifique sempre se o endereço está correto. Não nos responsabilizamos
                                    por entregas em endereços incorretos.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-corporate mb-2">Problemas na Entrega</h4>
                                <p className="text-subtitle text-sm">
                                    Em caso de problemas com a entrega, entre em contato conosco
                                    imediatamente pelo WhatsApp para resolvermos juntos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment; 