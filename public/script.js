// script.js
// Versao inicial: todo o trabalho acontece no navegador.
// A tarefa consiste em levar gerarDesenho para o servidor (Pages Functions)
// e fazer esta pagina apenas enviar o numero e exibir a resposta.

const formulario = document.getElementById("formulario");
const campoNumero = document.getElementById("numero");
const area = document.getElementById("desenho");
const mensagem = document.getElementById("mensagem");
const botaoBaixar = document.getElementById("baixar");

let svgAtual = "";
let tokenGoogle = null;

window.handleCredentialResponse = function (response) {
  tokenGoogle = response.credential;
  mensagem.style.color = "#3fb950";
  mensagem.textContent = "Login realizado com sucesso! Escolha o número e clique em Desenhar.";
};

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mensagem.style.color = "";
  mensagem.textContent = "";

  const numero = Number(campoNumero.value);

  if (!Number.isInteger(numero) || numero < 1 || numero > 100) {
    mensagem.textContent = "Digite um inteiro entre 1 e 100.";
    return;
  }

  if (!tokenGoogle) {
    mensagem.textContent = "Faça login com a conta Google antes de gerar o desenho.";
    return;
  }

  try {
    const resposta = await fetch("/api/desenho", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenGoogle}`,
      },
      body: JSON.stringify({ numero }),
    });

    if (resposta.status === 200) {
      svgAtual = await resposta.text();
      area.innerHTML = svgAtual;
      botaoBaixar.hidden = false;
      mensagem.textContent = "";
    } else {
      const dadosErro = await resposta.json().catch(() => ({}));
      mensagem.textContent = dadosErro.error || `Erro na requisição (Status ${resposta.status}).`;
      area.innerHTML = "";
      botaoBaixar.hidden = true;
    }
  } catch (erro) {
    mensagem.textContent = "Erro de conexão com o servidor.";
  }
});

botaoBaixar.addEventListener("click", () => {
  const arquivo = new Blob([svgAtual], { type: "image/svg+xml" });
  const url = URL.createObjectURL(arquivo);
  const link = document.createElement("a");
  link.href = url;
  link.download = "exemplo.svg";
  link.click();
  URL.revokeObjectURL(url);
});