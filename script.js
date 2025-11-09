let saldo = 0;
let chatStorico = [];

window.onload = function () {
  const saldoSalvato = localStorage.getItem("saldo");
  const chatSalvata = localStorage.getItem("chat");

  if (saldoSalvato) {
    saldo = parseFloat(saldoSalvato);
    document.getElementById("saldo").innerText = `Saldo attuale: ${saldo.toFixed(2)} €`;
  }

  if (chatSalvata) {
    chatStorico = JSON.parse(chatSalvata);
    chatStorico.forEach(messaggio => {
      document.getElementById("chatbox").innerHTML += messaggio;
    });
  }
};

function chat() {
  const input = document.getElementById("input").value.toLowerCase().trim();
  const chatbox = document.getElementById("chatbox");
  let risposta = "";

  if (input.includes("ho speso")) {
    let cifra = estraiNumero(input);
    saldo -= cifra;
    risposta = `Spesa di ${cifra} € registrata.`;
  } else if (input.includes("ho guadagnato")) {
    let cifra = estraiNumero(input);
    saldo += cifra;
    risposta = `Guadagno di ${cifra} € registrato.`;
  } else if (input.includes("quanto ho speso") || input.includes("saldo")) {
    risposta = `Il tuo saldo attuale è ${saldo.toFixed(2)} €`;
  } else {
    risposta = "Comando non riconosciuto.";
  }

  const messaggioUtente = `<p><strong>Tu:</strong> ${input}</p>`;
  const messaggioLemAI = `<p><strong>Portafoglio:</strong> ${risposta}</p>`;

  chatbox.innerHTML += messaggioUtente + messaggioLemAI;
  chatStorico.push(messaggioUtente, messaggioLemAI);

  document.getElementById("input").value = "";
  document.getElementById("saldo").innerText = `Saldo attuale: ${saldo.toFixed(2)} €`;


  localStorage.setItem("saldo", saldo);
  localStorage.setItem("chat", JSON.stringify(chatStorico));
}

function estraiNumero(testo) {
  let numeri = testo.match(/\d+(\.\d+)?/);
  return numeri ? parseFloat(numeri[0]) : 0;
}

function cancellaCronologia() {
  localStorage.clear();
  saldo = 0;
  chatStorico = [];
  document.getElementById("chatbox").innerHTML = "";
  document.getElementById("saldo").innerText = "Saldo attuale: 0 €";
}
