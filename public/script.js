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

    await fetch("/enviar-pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    window.location.href = "pedido.html";
  });
}

    if (window.location.pathname.includes("pedido.html")) {
    fetch("/resumo-pedido")
    .then(res => res.json())
    .then(pedido => {
    
      document.getElementById("resumo").innerHTML = `
        <p>Pizza: ${pedido.pizza}</p>
        <p>Tamanho: ${pedido.tamanho}</p>
        <p>Adicionais: ${pedido.adicionais.join(", ") || "Nenhum"}</p>
        <p><strong>Total: R$${pedido.total}</strong></p>
      `;
    });
}
