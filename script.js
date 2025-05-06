


const usAndroidOffers = [
  { url: "https://us-android-offer1.com" },
  { url: "https://us-android-offer2.com" },
  { url: "https://us-android-offer3.com" }
];

const usIosOffers = [
  { url: "https://us-ios-offer1.com" },
  { url: "https://us-ios-offer2.com" },
  { url: "https://us-ios-offer3.com" }
];

const intlAndroidOffers = [
  { url: "https://intl-android-offer1.com" },
  { url: "https://intl-android-offer2.com" },
  { url: "https://intl-android-offer3.com" }
];

const intlIosOffers = [
  { url: "https://intl-ios-offer1.com" },
  { url: "https://intl-ios-offer2.com" },
  { url: "https://intl-ios-offer3.com" }
];

const button = document.getElementById("offer-button");
const chanceText = document.getElementById("chance-text");
const progressBar = document.getElementById("progress-bar");
const completionMsg = document.getElementById("completion-message");

let offers = [];
let chance = parseInt(localStorage.getItem("chance")) || 0;
let lastClickTime = parseInt(localStorage.getItem("lastClickTime")) || 0;
let step = parseInt(localStorage.getItem("step")) || 0;
const delayInMs = 3 * 60 * 1000; // 3 minutes

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
  if (chance >= 100) {
    chanceText.textContent = "Chance: 100% - You're In!";
    progressBar.style.width = "100%";
    button.style.display = "none";
    completionMsg.style.display = "block";
    chanceText.style.display = "block";
    progressBar.style.display = "block";
    return;
  }

  if (chance > 0) {
    chanceText.textContent = `Chance: ${chance}%`;
    progressBar.style.width = `${chance}%`;
    chanceText.style.display = "block";
    progressBar.style.display = "block";
  } else {
    chanceText.style.display = "none";
    progressBar.style.display = "none";
  }

  const now = Date.now();
  const timeLeft = lastClickTime + delayInMs - now;

  if (timeLeft > 0) {
    disableButtonWithTimer(timeLeft);
  } else {
    enableButton();
  }
}

function enableButton() {
  button.disabled = false;
  button.textContent = step === 0 ? "🎯 Start Now" : "🚀 Increase Your Chance!";
}

function disableButtonWithTimer(timeLeft) {
  button.disabled = true;

  const interval = setInterval(() => {
    const now = Date.now();
    const remaining = lastClickTime + delayInMs - now;

    if (remaining <= 0) {
      clearInterval(interval);
      chance += 7;
      step += 1;

      localStorage.setItem("chance", chance);
      localStorage.setItem("step", step);

      updateUI();
    } else {
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      button.textContent = `⏳ Please wait: ${mins}:${secs < 10 ? "0" + secs : secs}`;
    }
  }, 1000);
}

button.addEventListener("click", () => {
  if (step < offers.length) {
    window.open(offers[step].url, "_blank");
    lastClickTime = Date.now();
    localStorage.setItem("lastClickTime", lastClickTime);
    disableButtonWithTimer(delayInMs);
  }
});

async function init() {
  const country = await getCountry();
  const device = getDeviceType();
  offers = chooseOffers(country, device);
  updateUI();
}

init();
