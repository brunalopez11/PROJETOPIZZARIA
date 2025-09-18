if (document.getElementById("form-pedido")) {
  document.getElementById("form-pedido").addEventListener("submit", async (e) => {
    e.preventDefault();

    let pizza = document.getElementById("pizza").value.split("|");
    let tamanho = document.querySelector('input[name="tamanho"]:checked').value.split("|");

    let adicionais = [];
    let total = parseFloat(pizza[1]) + parseFloat(tamanho[1]);

    document.querySelectorAll('input[name="adicional"]:checked').forEach((el) => {
      let val = el.value.split("|");
      adicionais.push(val[0]);
      total += parseFloat(val[1]);
    });

    let pedido = {
      pizza: pizza[0],
      tamanho: tamanho[0],
      adicionais: adicionais,
      total: total
    };

    console.log("Enviando pedido:", pedido);

    await fetch("/enviar-pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    // Redireciona para a página de pedido
    window.location.href = "pedido.html";
  });
}

// Se estiver na página de pedido.html, busca os dados do servidor
if (window.location.pathname.includes("pedido.html")) {
  fetch("/resumo-pedido")
    .then(res => res.json())
    .then(pedido => {
      console.log("Pedido recebido do servidor:", pedido);

      if (!pedido || Object.keys(pedido).length === 0) {
        document.getElementById("resumo").innerHTML = `
          <p>Nenhum pedido foi encontrado. <a href="cardapio.html">Voltar ao cardápio</a></p>
        `;
        return;
      }

      document.getElementById("resumo").innerHTML = `
        <p>🍕 <strong>Pizza:</strong> ${pedido.pizza}</p>
        <p>📏 <strong>Tamanho:</strong> ${pedido.tamanho}</p>
        <p>➕ <strong>Adicionais:</strong> ${pedido.adicionais.join(", ") || "Nenhum"}</p>
        <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
      `;
    })
    .catch(err => {
      console.error("Erro ao buscar pedido:", err);
      document.getElementById("resumo").innerHTML = `
        <p>Erro ao carregar o pedido. Verifique se o servidor está rodando.</p>
      `;
    });
}
