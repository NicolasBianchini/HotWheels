# Configuração do Firebase - Hot Wheels Marketplace

## Serviços Configurados

✅ **Firebase Authentication** - Sistema de login/registro de usuários
✅ **Cloud Firestore** - Banco de dados para armazenar dados de usuários e produtos
✅ **Firebase Analytics** - Análise de uso da aplicação

## Configuração Realizada

### 1. Arquivo de Configuração (`firebase.ts`)
- Inicialização do Firebase com suas credenciais
- Exportação dos serviços: `auth`, `db`, `analytics`

### 2. AuthContext Atualizado
- Integração completa com Firebase Authentication
- Funções implementadas:
  - `register(name, email, password)` - Criar nova conta
  - `login(email, password)` - Fazer login
  - `logout()` - Fazer logout
  - Estado automático do usuário com `onAuthStateChanged`

### 3. Firestore Integration
- Criação de documento do usuário no Firestore após registro
- Sincronização de dados de perfil entre Authentication e Firestore

### 4. Regras de Segurança (`firestore.rules`)
- Usuários podem acessar apenas seus próprios dados
- Leitura pública de produtos
- Escrita de produtos apenas para admins

## Como Usar

### Registro de Usuário
```typescript
const { register } = useAuth();
await register('Nome Completo', 'email@exemplo.com', 'senha123');
```

### Login
```typescript
const { login } = useAuth();
await login('email@exemplo.com', 'senha123');
```

### Logout
```typescript
const { logout } = useAuth();
await logout();
```

### Verificar Estado do Usuário
```typescript
const { user, loading } = useAuth();

if (loading) return <div>Carregando...</div>;
if (!user) return <div>Usuário não logado</div>;
return <div>Olá, {user.name}!</div>;
```

## Estrutura do Firestore

### Coleção `users`
```
users/{userId}
├── name: string
├── email: string
├── avatar: string
└── createdAt: string
```

### Coleção `orders` (futura)
```
orders/{orderId}
├── userId: string
├── items: array
├── total: number
├── status: string
└── createdAt: string
```

### Coleção `carts` (futura)
```
carts/{userId}
├── items: array
└── updatedAt: string
```

## Próximos Passos

1. **Implementar carrinho no Firestore** - Sincronizar carrinho entre dispositivos
2. **Sistema de pedidos** - Armazenar pedidos no Firestore
3. **Upload de imagens** - Firebase Storage para imagens de produtos
4. **Notificações push** - Firebase Cloud Messaging
5. **Analytics** - Implementar eventos customizados

## Comandos Úteis

```bash
# Instalar dependências do Firebase
npm install firebase

# Executar aplicação
npm run dev

# Deploy das regras do Firestore (quando configurado)
firebase deploy --only firestore:rules
```

## Troubleshooting

### Erro: "Firebase App named '[DEFAULT]' already exists"
- O Firebase já foi inicializado. Reinicie a aplicação.

### Erro: "Missing or insufficient permissions"
- Verifique as regras do Firestore em `firestore.rules`
- Certifique-se de que o usuário está autenticado

### Erro de CORS
- Adicione seu domínio nas configurações do projeto Firebase
- Verifique se a autenticação está habilitada 