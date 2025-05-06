const offers = [
    { url: "https://example.com/offer1", chance: 7 },
    { url: "https://example.com/offer2", chance: 18 },
    { url: "https://example.com/offer3", chance: 33 },
    { url: "https://example.com/offer4", chance: 52 },
    { url: "https://example.com/offer5", chance: 95 }
  ];
  
  let currentStep = parseInt(localStorage.getItem("step")) || 0;
  
  const button = document.getElementById("offer-button");
  const chanceText = document.getElementById("chance-text");
  const progressBar = document.getElementById("progress-bar");
  const headline = document.getElementById("headline");
  const completionMsg = document.getElementById("completion-message");
  
  function updateUI() {
    if (currentStep < offers.length) {
      let chance = offers[currentStep - 1]?.chance || 0;
      chanceText.textContent = `Chance: ${chance}%`;
      progressBar.style.width = `${chance}%`;
      button.textContent = currentStep === 0
        ? "Start & Get Your First Chance!"
        : "Increase Your Chance! Complete This Step";
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
  