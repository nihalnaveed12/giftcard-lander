const usAndroidOffers = [
  { url: "https://us-android-offer1.com", chance: 10 },
  { url: "https://us-android-offer2.com", chance: 30 },
  { url: "https://us-android-offer3.com", chance: 55 },
];

const usIosOffers = [
  { url: "https://us-ios-offer1.com", chance: 10 },
  { url: "https://us-ios-offer2.com", chance: 30 },
  { url: "https://us-ios-offer3.com", chance: 55 },
];

const intlAndroidOffers = [
  { url: "https://intl-android-offer1.com", chance: 15 },
  { url: "https://intl-android-offer2.com", chance: 40 },
  { url: "https://intl-android-offer3.com", chance: 65 },
];

const intlIosOffers = [
  { url: "https://intl-ios-offer1.com", chance: 15 },
  { url: "https://intl-ios-offer2.com", chance: 40 },
  { url: "https://intl-ios-offer3.com", chance: 65 },
];

const button = document.getElementById("offer-button");
const chanceText = document.getElementById("chance-text");
const progressBar = document.getElementById("progress-bar");
const completionMsg = document.getElementById("completion-message");

let currentStep = parseInt(localStorage.getItem("step")) || 0;
let offers = [];

async function getCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country || "INTL";
  } catch {
    return "INTL";
  }
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "desktop";
}

function chooseOffers(country, device) {
  const isUS = country === "US";
  if (isUS && device === "android") return usAndroidOffers;
  if (isUS && device === "ios") return usIosOffers;
  if (!isUS && device === "android") return intlAndroidOffers;
  if (!isUS && device === "ios") return intlIosOffers;
  return intlAndroidOffers; 
}

function updateUI() {
  if (currentStep < offers.length) {
    const chance = offers[currentStep].chance;
    chanceText.textContent = `Chance: ${chance}%`;
    progressBar.style.width = `${chance}%`;
    button.textContent = currentStep === 0 ? "🎯 Start Now" : "🚀 Increase Your Chance!";
  } else {
    chanceText.textContent = "Chance: 100% - You're In!";
    progressBar.style.width = "100%";
    button.style.display = "none";
    completionMsg.style.display = "block";
  }
}

button.addEventListener("click", () => {
  if (currentStep < offers.length) {
    window.open(offers[currentStep].url, "_blank");
    currentStep++;
    localStorage.setItem("step", currentStep);
    updateUI();
  }
});

async function init() {
  const country = await getCountry();
  const device = getDeviceType();
  offers = chooseOffers(country, device);
  updateUI();
}

init();