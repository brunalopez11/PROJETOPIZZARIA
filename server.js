const express = require("express");
const path = require("path");

const app = express();
const PORT = 4500;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let pedido = {};

// 👉 Adiciona esta rota para abrir o index.html por padrão
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/enviar-pedido", (req, res) => {
  pedido = req.body;
  res.json({ message: "Pedido recebido com sucesso!" });
});

app.get("/resumo-pedido", (req, res) => {
  res.json(pedido);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
