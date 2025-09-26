# Projeto Pizzaria (Composite + Decorator)

##  Sobre  
Sistema simples de pizzaria usando **Node.js (Express)** com padrões GoF:  
- **Composite** → estrutura de itens do pedido (Produto, ConjuntoDeItens).  
- **Decorator** → notificadores (Email → SMS → WhatsApp).  

Front-end em **HTML/CSS/JS** com 3 páginas:  
- `index.html` → Início  
- `cardapio.html` → Montar pedido  
- `pedido.html` → Resumo + Checkout  

---

## Como rodar  
1. Instale dependências:
```bash

# Instalar dependências
npm install express

# Iniciar servidor
node server.js

# Acesse no navegador:
http://localhost:4500
---
