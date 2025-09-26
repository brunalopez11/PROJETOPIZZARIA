const express = require("express");
const path = require("path");
const { Pedido, Produto, ConjuntoDeItens, NotificadorEmail, NotificadorSMS, NotificadorWhatsApp } = require("./pedidoComposite");

const app = express();
const PORT = 4500;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let pedidoAtual = null;

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Recebe pedido do front
app.post("/enviar-pedido", (req, res) => {
  const dados = req.body;

  // Monta os produtos com Composite
  const pizza = new Produto(dados.pizza, parseFloat(dados.total) - (dados.adicionais.length * 0)); 
  const pedidoItens = new ConjuntoDeItens("Pedido do Cliente");
  pedidoItens.adicionar(pizza);

  dados.adicionais.forEach(adicional => {
    pedidoItens.adicionar(new Produto(adicional, 5)); // aqui coloquei 5 fixo, mas pode vir do form
  });

  // Criar objeto Pedido
  pedidoAtual = new Pedido(
    { nome: "Cliente Web", email: "cliente@email.com", sms: "1199999-9999", whatsapp: "1198888-8888" },
    pedidoItens
  );

  res.json({ message: "Pedido recebido com sucesso!" });
});

// Rota de resumo
app.get("/resumo-pedido", (req, res) => {
  if (!pedidoAtual) return res.json({});
  res.json({
    resumo: pedidoAtual.gerarResumoTexto(),
    total: pedidoAtual.obterTotal()
  });
});

// Rota de checkout para disparar notificações
app.post("/checkout", (req, res) => {
  if (!pedidoAtual) return res.json({ message: "Nenhum pedido" });

  let notificador = new NotificadorEmail(pedidoAtual.cliente.email);
  notificador = new NotificadorSMS(notificador, pedidoAtual.cliente.sms);
  notificador = new NotificadorWhatsApp(notificador, pedidoAtual.cliente.whatsapp);

  pedidoAtual.realizarCheckout(notificador);

  res.json({ message: "Pedido finalizado com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
