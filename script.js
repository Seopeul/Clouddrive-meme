const startButton = document.querySelector("#startButton");
const againButton = document.querySelector("#againButton");
const progressArea = document.querySelector("#progressArea");
const progressBar = document.querySelector("#progressBar");
const progressTrack = document.querySelector("#progressTrack");
const progressLabel = document.querySelector("#progressLabel");
const percentLabel = document.querySelector("#percent");
const statusLabel = document.querySelector("#status");
const result = document.querySelector("#result");

const messages = [
  { percent: 0, text: "Conectando ao servidor de discos rígidos imaginários..." },
  { percent: 18, text: "Procurando espaço livre no universo..." },
  { percent: 39, text: "Compactando 1.000 GB em pura esperança..." },
  { percent: 62, text: "Convencendo o SSD a acreditar em si mesmo..." },
  { percent: 84, text: "Instalando bytes imaginários..." },
  { percent: 96, text: "Finalizando o milagre tecnológico..." }
];

let timerId = null;

function updateProgress(value) {
  progressBar.style.width = `${value}%`;
  percentLabel.textContent = `${value}%`;
  progressTrack.setAttribute("aria-valuenow", String(value));

  // Mostra a mensagem correspondente à etapa atual.
  const currentMessage = [...messages]
    .reverse()
    .find((message) => value >= message.percent);

  if (currentMessage) {
    statusLabel.textContent = currentMessage.text;
  }
}

function startFakeDownload() {
  // Impede dois downloads de rodarem ao mesmo tempo.
  clearInterval(timerId);

  let progress = 0;

  startButton.disabled = true;
  startButton.textContent = "⏳ BAIXANDO ARMAZENAMENTO...";
  progressArea.hidden = false;
  result.hidden = true;
  progressLabel.textContent = "Preparando espaço no espaço...";
  statusLabel.textContent = messages[0].text;
  updateProgress(0);

  timerId = setInterval(() => {
    // Avança uma quantidade aleatória para parecer um download.
    progress += Math.floor(Math.random() * 5) + 2;

    if (progress >= 100) {
      progress = 100;
    }

    updateProgress(progress);

    if (progress === 100) {
      clearInterval(timerId);
      progressLabel.textContent = "Operação concluída";
      statusLabel.textContent =
        "1 TB de armazenamento imaginário entregue com sucesso.";

      startButton.disabled = false;
      startButton.textContent = "✅ DOWNLOAD CONCLUÍDO";
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, 180);
}

startButton.addEventListener("click", startFakeDownload);

againButton.addEventListener("click", () => {
  progressArea.scrollIntoView({ behavior: "smooth", block: "nearest" });
  startFakeDownload();
});
