# 🚀 Guia Rápido - Resolver Problema dos Filtros

## ❌ Problema
Os filtros não estão funcionando porque não há produtos no Firebase.

## ✅ Solução Rápida

### 1. **Acessar a página de migração**
```
http://localhost:5173/migrate
```

### 2. **Executar migração em 4 passos**

1. **Testar Conexão**: Clique em "🔗 Testar Conexão"
2. **Verificar Dados**: Clique em "📊 Verificar Dados"  
3. **Migrar Produtos**: Clique em "🚀 Migrar Dados"
4. **Voltar ao Catálogo**: Navegue para `/catalogo`

### 3. **Verificar se funcionou**
- Acesse: `http://localhost:5173/catalogo`
- Deve mostrar 8 produtos
- Filtros devem funcionar:
  - **Marcas**: Hot Wheels, Mini GT, Auto World, Tarmac Works, Jada, Auto Art, Burago
  - **Categorias**: Premium, Mainline
  - **Séries**: Velozes e Furiosos, Muscle Cars, JDM Collection, etc.
  - **Anos**: 1970, 1995, 2018, 2019, 2020, 2021, 2022, 2023

## 🎯 Produtos Adicionados

| Produto | Marca | Categoria | Série |
|---------|-------|-----------|-------|
| Toyota Supra | Hot Wheels | Premium | Velozes e Furiosos |
| Chevrolet Camaro SS | Hot Wheels | Mainline | Muscle Cars |
| Nissan GT-R R35 | Mini GT | Premium | JDM Collection |
| Ford Mustang GT | Auto World | Mainline | American Classics |
| Lamborghini Huracán | Tarmac Works | Premium | Supercars |
| Volkswagen Beetle | Jada | Mainline | Classic Cars |
| McLaren P1 | Auto Art | Premium | Hypercars |
| Dodge Charger R/T | Burago | Mainline | American Muscle |

## 🔧 Se ainda não funcionar

1. **Limpar dados**: Na página `/migrate`, clique em "🗑️ Limpar Dados"
2. **Migrar novamente**: Clique em "🚀 Migrar Dados"
3. **Atualizar página**: F5 no navegador

## 📱 Teste dos Filtros

Após a migração, teste:
- ✅ Filtro por marca "Jada" → deve mostrar 1 produto
- ✅ Filtro por categoria "Premium" → deve mostrar 4 produtos  
- ✅ Filtro por série "Muscle Cars" → deve mostrar 1 produto
- ✅ Filtro por ano "2023" → deve mostrar 1 produto
- ✅ Faixa de preço 100-200 → deve mostrar 3 produtos 