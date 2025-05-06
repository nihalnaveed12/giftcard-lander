const offers = [
  { url: "https://example.com/offer1", chance: 10 },
  { url: "https://example.com/offer2", chance: 25 },
  { url: "https://example.com/offer3", chance: 45 },
  { url: "https://example.com/offer4", chance: 70 },
  { url: "https://example.com/offer5", chance: 95 }
];

let currentStep = parseInt(localStorage.getItem("step")) || 0;

const button = document.getElementById("offer-button");
const chanceText = document.getElementById("chance-text");
const progressBar = document.getElementById("progress-bar");
const completionMsg = document.getElementById("completion-message");

function updateUI() {
  if (currentStep < offers.length) {
    const chance = offers[currentStep - 1]?.chance || 0;
    chanceText.textContent = `Chance: ${chance}%`;
    progressBar.style.width = `${chance}%`;
    button.textContent = currentStep === 0
      ? "🎯 Start Now"
      : "🚀 Increase Your Chance!";
  } else {
    chanceText.textContent = "Chance: 95% - MAX REACHED!";
    progressBar.style.width = `95%`;
    button.style.display = "none";
    completionMsg.style.display = "block";
  }
}

button.addEventListener("click", () => {
  if (currentStep < offers.length) {
    const offer = offers[currentStep];
    window.open(offer.url, "_blank");
    currentStep++;
    localStorage.setItem("step", currentStep);
    updateUI();
  }
});

updateUI();
