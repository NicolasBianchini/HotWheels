# Guia de Integração do Firestore Database

Este documento fornece instruções passo a passo para integrar completamente o Firestore Database ao projeto Hot Wheels Marketplace.

## 🔧 Status da Integração

### ✅ Já Configurado:
- [x] Firebase SDK configurado (`firebase.ts`)
- [x] Contexto de produtos com Firestore (`ProductsContext.tsx`)
- [x] Utilitário de inicialização (`utils/initializeFirestore.ts`)
- [x] Regras de segurança do Firestore (`firestore.rules`)
- [x] Todas as páginas usando contexto de produtos
- [x] Sistema de fallback para dados locais

### 🚀 Como Funciona:

1. **Inicialização Automática**: O sistema verifica se há produtos no Firestore na primeira execução
2. **Sincronização**: Se não houver produtos, carrega automaticamente os dados locais para o Firestore
3. **Tempo Real**: Todas as alterações são refletidas instantaneamente via listeners
4. **Fallback**: Se o Firestore não estiver disponível, usa dados locais

## 📋 Passos para Configuração Completa

### 1. Verificar Configuração do Firebase

Certifique-se de que o arquivo `firebase.ts` tem suas credenciais corretas:

```typescript
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    // ... outras configurações
};
```

### 2. Configurar Regras do Firestore

Execute este comando para deploy das regras:

```bash
npm run setup:firestore
```

Ou aplique manualmente no Firebase Console as regras do arquivo `firestore.rules`.

### 3. Executar o Projeto

```bash
npm run dev
```

Na primeira execução, o sistema irá:
- ✅ Verificar conexão com Firestore
- ✅ Inicializar produtos automaticamente
- ✅ Configurar listeners em tempo real

### 4. Criar Usuário Administrador

```bash
npm run setup:admin
```

Ou siga as instruções em `ADMIN_SETUP.md`.

## 🔍 Verificando se Está Funcionando

### 1. Console do Navegador
Abra o DevTools e verifique se aparecem essas mensagens:

```
✅ Conexão com Firestore estabelecida com sucesso!
🔄 Verificando se produtos já existem no Firestore...
📦 Inicializando produtos no Firestore...
✅ Produtos inicializados com sucesso no Firestore!
📊 Total de produtos adicionados: 8
```

### 2. Firebase Console
1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Vá para **Firestore Database**
3. Verifique se existe a coleção `products` com 8 documentos

### 3. Interface da Aplicação
- O catálogo deve carregar os produtos
- A busca deve funcionar
- Se você é admin, deve conseguir ver/editar produtos

## 🛠️ Funcionalidades Implementadas

### 📊 Gerenciamento de Produtos
- **Listagem**: Produtos carregados do Firestore em tempo real
- **Busca**: Funciona tanto com dados locais quanto do Firestore  
- **Filtros**: Categorias e status de estoque
- **CRUD Admin**: Adicionar, editar, excluir (apenas admins)

### 🔄 Sincronização em Tempo Real
- **Listeners**: Atualizações automáticas sem refresh
- **Múltiplos usuários**: Vários admins podem trabalhar simultaneamente
- **Fallback**: Sempre funciona, mesmo offline

### 🛡️ Segurança
- **Regras**: Leitura pública, escrita apenas para admins
- **Autenticação**: Integrada com Firebase Auth
- **Validação**: Proteção contra dados inválidos

## 📁 Estrutura dos Dados

### Coleção `products`
```typescript
{
  id: string,              // Auto-gerado pelo Firestore
  name: string,            // Nome do produto
  series: string,          // Série do Hot Wheels
  year: number,            // Ano de lançamento
  price: number,           // Preço atual
  originalPrice?: number,  // Preço original (se em oferta)
  image: string,           // URL da imagem
  description: string,     // Descrição detalhada
  condition: string,       // Condição (Novo, Usado, etc.)
  category: string,        // Categoria (Mainline, Premium, etc.)
  color: string,           // Cor principal
  inStock: boolean,        // Se está em estoque
  featured?: boolean,      // Se é produto em destaque
  rarity: string,          // Raridade (Comum, Raro, etc.)
  createdAt: string,       // Data de criação
  updatedAt: string        // Última atualização
}
```

### Coleção `users`
```typescript
{
  id: string,              // UID do Firebase Auth
  name: string,            // Nome do usuário
  email: string,           // Email
  avatar?: string,         // URL do avatar
  role: 'user' | 'admin',  // Permissões
  createdAt: string,       // Data de criação
  updatedAt?: string       // Última atualização
}
```

## 🚨 Solução de Problemas

### Erro: "Permission denied"
- ✅ Verifique se as regras do Firestore estão aplicadas
- ✅ Execute: `npm run setup:firestore`

### Produtos não aparecem
- ✅ Verifique a conexão com internet
- ✅ Veja o console do navegador para erros
- ✅ Verifique se a coleção `products` existe no Firestore

### Admin não consegue editar
- ✅ Verifique se o usuário tem `role: 'admin'` no Firestore
- ✅ Execute: `npm run setup:admin`

### Firestore não conecta
- ✅ Verifique as credenciais em `firebase.ts`
- ✅ O sistema usa fallback para dados locais automaticamente

## 📈 Próximos Passos

Com o Firestore integrado, você pode agora:

1. **Adicionar Produtos**: Implementar formulários de CRUD
2. **Analytics**: Tracking de visualizações e interações
3. **Notificações**: Push notifications para novos produtos
4. **Backup**: Sistemas de backup automático
5. **CDN**: Otimização de imagens via Firebase Storage

## 🎯 Comandos Úteis

```bash
# Iniciar desenvolvimento
npm run dev

# Configurar admin
npm run setup:admin

# Deploy das regras
npm run setup:firestore

# Build para produção
npm run build
```

## ✅ Checklist de Verificação

- [ ] Firestore configurado no Firebase Console
- [ ] Regras de segurança aplicadas
- [ ] Produtos aparecem no catálogo
- [ ] Busca funcionando
- [ ] Admin criado e funcionando
- [ ] Painel admin acessível
- [ ] Tempo real funcionando (teste com múltiplas abas)

**🎉 Parabéns! Seu marketplace está agora totalmente integrado com Firestore!** 