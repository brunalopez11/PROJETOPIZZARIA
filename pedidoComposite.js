// ============ Composite ============

// Contrato comum
class ItemDePedido {
  obterNome() {}
  obterPreco() {}
}

// Produto
class Produto extends ItemDePedido {
  constructor(nome, preco) {
    super();
    this.nome = nome;
    this.preco = preco;
  }

  obterNome() {
    return this.nome;
  }

  obterPreco() {
    return this.preco;
  }
}

// Composite: conjunto de itens (ex: pizza + adicionais + entrega)
class ConjuntoDeItens extends ItemDePedido {
  constructor(nome) {
    super();
    this.nome = nome;
    this.itens = [];
  }

  adicionar(item) {
    this.itens.push(item);
  }

  obterNome() {
    return this.nome;
  }

  obterPreco() {
    return this.itens.reduce((total, item) => total + item.obterPreco(), 0);
  }
}

// ============ Pedido ============

class Pedido {
  constructor(cliente, itens) {
    this.cliente = cliente;
    this.itens = itens;
    this.status = "PENDENTE";
  }

  obterTotal() {
    return this.itens.obterPreco();
  }

  gerarResumoTexto() {
    let resumo = `Cliente: ${this.cliente.nome}\n`;
    resumo += "Itens:\n";
    this.itens.itens.forEach(item => {
      resumo += `- ${item.obterNome()} (R$${item.obterPreco().toFixed(2)})\n`;
    });
    resumo += `Total: R$ ${this.obterTotal().toFixed(2)}`;
    return resumo;
  }

  realizarCheckout(notificador) {
    this.status = "PAGO";
    notificador.enviar(`Pedido confirmado! Total: R$ ${this.obterTotal().toFixed(2)}`);
  }
}

// ============ Decorator (Notificadores) ============

class Notificador {
  enviar(mensagem) {
    console.log("Notificação:", mensagem);
  }
}

class NotificadorEmail extends Notificador {
  constructor(email) {
    super();
    this.email = email;
  }

  enviar(mensagem) {
    console.log(`📧 Enviando email para ${this.email}: ${mensagem}`);
  }
}

class NotificadorSMS extends Notificador {
  constructor(base, numero) {
    super();
    this.base = base;
    this.numero = numero;
  }

  enviar(mensagem) {
    this.base.enviar(mensagem);
    console.log(`📱 Enviando SMS para ${this.numero}: ${mensagem}`);
  }
}

class NotificadorWhatsApp extends Notificador {
  constructor(base, numero) {
    super();
    this.base = base;
    this.numero = numero;
  }

  enviar(mensagem) {
    this.base.enviar(mensagem);
    console.log(`💬 Enviando WhatsApp para ${this.numero}: ${mensagem}`);
  }
}

module.exports = { Produto, ConjuntoDeItens, Pedido, NotificadorEmail, NotificadorSMS, NotificadorWhatsApp };
