let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let cupomAtivo = null;

const lista = document.getElementById("lista-carrinho");
const subtotalElem = document.getElementById("subtotal");
const descontoElem = document.getElementById("desconto");
const totalElem = document.getElementById("total");
const cupomInput = document.getElementById("cupom");

function atualizarCarrinho() {
  lista.innerHTML = "";
  let subtotal = 0;

  carrinho.forEach((item, index) => {
    subtotal += item.preco;

    const li = document.createElement("li");
    li.innerHTML = `${item.nome} — R$ ${item.preco.toFixed(2)} 
      <button onclick="removerItem(${index})">🗑️</button>`;
    lista.appendChild(li);
  });

  let desconto = 0;
  if (cupomAtivo === "DESCONTO10") desconto = subtotal * 0.1;
  if (cupomAtivo === "DESCONTO20") desconto = subtotal * 0.2;

  const total = subtotal - desconto;

  subtotalElem.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
  descontoElem.textContent = `Desconto: R$ ${desconto.toFixed(2)}`;
  totalElem.textContent = `Total: R$ ${total.toFixed(2)}`;

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

document.getElementById("aplicar-cupom").addEventListener("click", () => {
  const cupom = cupomInput.value.trim().toUpperCase();
  if (["DESCONTO10", "DESCONTO20"].includes(cupom)) {
    cupomAtivo = cupom;
    alert("Cupom aplicado com sucesso!");
  } else {
    alert("Cupom inválido.");
  }
  atualizarCarrinho();
});

document.getElementById("finalizar").addEventListener("click", () => {
  let mensagem = "🛍️ *Resumo da compra:*\n\n";
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} — R$ ${item.preco.toFixed(2)}\n`;
  });
  mensagem += `\n*Total:* ${totalElem.textContent.replace("Total: ", "")}`;

  const telefone = "55SEUNUMEROAQUI"; // Ex: 55 11 99999-9999
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});

atualizarCarrinho();
