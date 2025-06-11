# Sistema Administrativo - Hot Wheels Marketplace

Este documento explica como configurar e usar o sistema administrativo implementado no marketplace de Hot Wheels.

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Autenticação com Roles
- Usuários podem ter role `user` (padrão) ou `admin`
- Autenticação integrada com Firebase Auth
- Proteção de rotas administrativas

### ✅ Painel Administrativo
- Dashboard com estatísticas dos produtos
- Visão geral do catálogo
- Acesso rápido às principais funcionalidades

### ✅ Gerenciamento de Produtos
- Listar todos os produtos com filtros avançados
- Buscar produtos por nome, série, categoria
- Filtrar por categoria e status de estoque
- Visualizar, editar e excluir produtos

### ✅ Funcionalidades de Busca
- Barra de busca funcional no header
- Busca por nome, série, descrição, cor, categoria e raridade
- Integração com a página de catálogo
- Resultados em tempo real

## 🔧 Configuração Inicial

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Firebase
Certifique-se de que o arquivo `firebase.ts` está configurado com suas credenciais do Firebase.

### 3. Inicializar Produtos no Firestore
O sistema irá automaticamente sincronizar os produtos locais com o Firestore na primeira execução.

### 4. Criar Usuário Administrador

#### Opção A: Script Automatizado
1. Configure o arquivo `create-admin.js` com suas credenciais do Firebase
2. Crie uma conta normal no site primeiro
3. Copie o ID do usuário do Firebase Auth Console
4. Execute: `node create-admin.js`

#### Opção B: Manualmente no Firebase Console
1. Acesse o Firebase Console
2. Vá para Firestore Database
3. Navegue para a coleção `users`
4. Encontre o documento do usuário
5. Adicione o campo `role` com valor `'admin'`
6. Adicione o campo `updatedAt` com a data atual

## 🎯 Como Usar o Sistema Admin

### Acessando o Painel
1. Faça login com uma conta que tenha role `admin`
2. No menu do usuário (canto superior direito), clique em "Painel Admin"
3. Ou acesse diretamente `/admin`

### Gerenciando Produtos
1. No painel admin, clique em "Gerenciar" ou "Novo Produto"
2. Use os filtros para encontrar produtos específicos
3. Clique em "Editar" para modificar um produto
4. Clique no ícone de lixeira para excluir um produto

### Funcionalidades Disponíveis

#### ✅ Já Implementadas:
- [x] Sistema de roles (user/admin)
- [x] Proteção de rotas administrativas
- [x] Dashboard com estatísticas
- [x] Listagem de produtos com filtros
- [x] Busca funcional no header
- [x] Exclusão de produtos
- [x] Visualização de produtos

#### 🚧 Próximas Implementações:
- [ ] Formulário para adicionar novos produtos
- [ ] Formulário para editar produtos existentes
- [ ] Sistema de promoções
- [ ] Relatórios e análises
- [ ] Upload de imagens
- [ ] Histórico de alterações

## 🛡️ Segurança

### Proteção de Rotas
- Todas as rotas `/admin/*` são protegidas
- Usuários sem role `admin` recebem mensagem de acesso negado
- Redirecionamento automático para login se não autenticado

### Validações
- Confirmação antes de excluir produtos
- Tratamento de erros em operações CRUD
- Fallback para dados locais em caso de falha

## 📱 Interface Responsiva

O painel administrativo foi desenvolvido com design responsivo:
- Layout adaptável para desktop, tablet e mobile
- Cards organizados em grid responsivo
- Formulários otimizados para diferentes tamanhos de tela

## 🔄 Sincronização em Tempo Real

- Alterações nos produtos são refletidas instantaneamente
- Múltiplos administradores podem trabalhar simultaneamente
- Atualizações automáticas via Firestore listeners

## 🎨 Design System

O design segue o mesmo padrão visual do marketplace:
- Cores da marca Hot Wheels
- Tipografia consistente
- Componentes reutilizáveis
- Feedback visual para ações do usuário

## 📚 Estrutura de Arquivos

```
src/
├── contexts/
│   ├── AuthContext.tsx       # Autenticação com roles
│   └── ProductsContext.tsx   # Gerenciamento de produtos
├── components/
│   ├── ProtectedRoute.tsx    # Proteção de rotas
│   └── Header.tsx           # Header com busca
├── pages/
│   ├── Admin.tsx            # Dashboard principal
│   ├── AdminProducts.tsx    # Gerenciar produtos
│   └── Catalog.tsx         # Catálogo com busca
└── types/
    └── index.ts            # Tipos com roles
```

## 🚀 Executando o Projeto

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 💡 Próximos Passos

Para completar o sistema administrativo, as próximas funcionalidades a implementar são:

1. **Formulários CRUD Completos**
   - Adicionar produtos
   - Editar produtos existentes
   - Validação de formulários

2. **Sistema de Promoções**
   - Configurar ofertas especiais
   - Definir produtos em destaque
   - Programar promoções

3. **Relatórios e Analytics**
   - Estatísticas de vendas
   - Produtos mais visualizados
   - Relatórios customizados

4. **Upload de Imagens**
   - Integração com Firebase Storage
   - Otimização de imagens
   - Múltiplas imagens por produto

Este sistema fornece uma base sólida e escalável para o gerenciamento completo do marketplace de Hot Wheels! 