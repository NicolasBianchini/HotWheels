import { RotateCcw, Package, Clock, CheckCircle, XCircle, AlertTriangle, Phone, Mail } from 'lucide-react';

const Returns = () => {
    return (
        <div className="min-h-screen bg-hotwheel-gray-25">
            <div className="container mx-auto px-4 section-padding">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-corporate mb-6">Política de Trocas e Devoluções</h1>
                        <p className="text-xl text-subtitle max-w-3xl mx-auto">
                            Sua satisfação é nossa prioridade. Conheça nossa política clara e justa
                            para trocas e devoluções de Hot Wheels.
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="card-corporate p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-corporate">7 Dias Corridos</h3>
                            <p className="text-subtitle text-sm">
                                Prazo para solicitar troca ou devolução a partir do recebimento
                            </p>
                        </div>

                        <div className="card-corporate p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-corporate">Produto Íntegro</h3>
                            <p className="text-subtitle text-sm">
                                Produto deve estar em perfeitas condições, sem sinais de uso
                            </p>
                        </div>

                        <div className="card-corporate p-6 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <RotateCcw className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-corporate">Processo Simples</h3>
                            <p className="text-subtitle text-sm">
                                Entre em contato conosco e orientamos todo o processo
                            </p>
                        </div>
                    </div>

                    {/* Main Policy */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-corporate mb-8 text-center">Condições Gerais</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* What's Accepted */}
                            <div className="card-corporate p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <h3 className="text-2xl font-bold text-corporate">Aceito para Troca/Devolução</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Produto com Defeito de Fabricação</h4>
                                            <p className="text-subtitle text-sm">Defeitos originais da Mattel identificados no produto</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Produto Diferente do Anunciado</h4>
                                            <p className="text-subtitle text-sm">Quando receber modelo diferente do que foi comprado</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Danos no Transporte</h4>
                                            <p className="text-subtitle text-sm">Avarias ocorridas durante o envio pelos Correios</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Desistência da Compra</h4>
                                            <p className="text-subtitle text-sm">Direito garantido pelo Código de Defesa do Consumidor</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Produto em Estado Mint/Near Mint</h4>
                                            <p className="text-subtitle text-sm">Embalagem original intacta, sem sinais de manuseio</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* What's NOT Accepted */}
                            <div className="card-corporate p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                    <h3 className="text-2xl font-bold text-corporate">NÃO Aceito para Troca/Devolução</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Produto Removido da Embalagem</h4>
                                            <p className="text-subtitle text-sm">Hot Wheels retirados do blister original</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Sinais de Uso ou Manuseio</h4>
                                            <p className="text-subtitle text-sm">Produtos com marcas de dedos, riscos ou desgaste</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Fora do Prazo de 7 Dias</h4>
                                            <p className="text-subtitle text-sm">Solicitações após o prazo estabelecido</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Embalagem Danificada pelo Cliente</h4>
                                            <p className="text-subtitle text-sm">Blisters cortados ou danificados intencionalmente</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-corporate">Itens Promocionais</h4>
                                            <p className="text-subtitle text-sm">Produtos oferecidos como brindes ou em promoções especiais</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Process Steps */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-corporate mb-8 text-center">Como Solicitar Troca ou Devolução</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-hotwheel-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                                    1
                                </div>
                                <h3 className="font-bold text-corporate mb-2">Entre em Contato</h3>
                                <p className="text-subtitle text-sm">
                                    WhatsApp ou e-mail dentro de 7 dias corridos do recebimento
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-hotwheel-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                                    2
                                </div>
                                <h3 className="font-bold text-corporate mb-2">Envie Fotos</h3>
                                <p className="text-subtitle text-sm">
                                    Fotografe o produto e embalagem para análise da nossa equipe
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-hotwheel-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                                    3
                                </div>
                                <h3 className="font-bold text-corporate mb-2">Aguarde Aprovação</h3>
                                <p className="text-subtitle text-sm">
                                    Nossa equipe analisa e aprova ou não a solicitação em até 24h
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-hotwheel-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                                    4
                                </div>
                                <h3 className="font-bold text-corporate mb-2">Envie o Produto</h3>
                                <p className="text-subtitle text-sm">
                                    Aprovado, enviamos etiqueta de retorno ou orientações de envio
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Types of Resolution */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-corporate mb-8 text-center">Tipos de Resolução</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card-corporate p-6">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <RotateCcw className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-corporate">Troca por Outro Produto</h3>
                                <p className="text-subtitle mb-4">
                                    Escolha outro Hot Wheels de valor equivalente do nosso estoque atual.
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-green-700 text-sm">
                                        ✓ Sem custo adicional<br />
                                        ✓ Enviamos o novo produto<br />
                                        ✓ Prazo: até 5 dias úteis
                                    </p>
                                </div>
                            </div>

                            <div className="card-corporate p-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-corporate">Devolução com Reembolso</h3>
                                <p className="text-subtitle mb-4">
                                    Devolvemos 100% do valor pago pelo produto e frete.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-blue-700 text-sm">
                                        ✓ Reembolso integral<br />
                                        ✓ Via Pix ou estorno<br />
                                        ✓ Prazo: até 7 dias úteis
                                    </p>
                                </div>
                            </div>

                            <div className="card-corporate p-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-corporate">Crédito na Loja</h3>
                                <p className="text-subtitle mb-4">
                                    Receba crédito para futuras compras com 10% de bônus.
                                </p>
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                    <p className="text-purple-700 text-sm">
                                        ✓ +10% de bônus<br />
                                        ✓ Válido por 1 ano<br />
                                        ✓ Disponível imediatamente
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="mb-16">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                                <h3 className="text-2xl font-bold text-corporate">Informações Importantes</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-corporate mb-2">Frete de Retorno</h4>
                                    <p className="text-subtitle text-sm">
                                        Em casos de defeito de fabricação ou erro nosso, arcamos com o frete de retorno.
                                        Em casos de desistência, o frete fica por conta do cliente.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-corporate mb-2">Análise Técnica</h4>
                                    <p className="text-subtitle text-sm">
                                        Todos os produtos retornados passam por análise técnica para verificar
                                        as condições e motivo da devolução.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-corporate mb-2">Produtos Raros</h4>
                                    <p className="text-subtitle text-sm">
                                        Para Hot Wheels muito raros ou exclusivos, a troca pode estar sujeita
                                        à disponibilidade de produto similar.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-corporate mb-2">Casos Especiais</h4>
                                    <p className="text-subtitle text-sm">
                                        Situações não previstas nesta política serão analisadas individualmente
                                        sempre buscando a melhor solução para o cliente.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-gradient-to-r from-hotwheel-primary to-hotwheel-red text-white rounded-3xl p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda?</h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Nossa equipe está sempre disponível para esclarecer dúvidas sobre trocas e devoluções.
                            Entre em contato conosco!
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a
                                href="https://wa.me/5551900000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-white text-hotwheel-primary px-8 py-4 rounded-lg font-semibold hover:bg-hotwheel-gray-100 transition-all transform hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                                WhatsApp: (51) 90000-0000
                            </a>
                            <a
                                href="mailto:contato@hotwheels.rafis.com"
                                className="flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-hotwheel-primary px-8 py-4 rounded-lg font-semibold transition-all"
                            >
                                <Mail className="w-5 h-5" />
                                E-mail: contato@hotwheels.rafis.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns; 