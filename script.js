// script.js - temperature conversion logic

const tempInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");

function parseNumber(value) {
  // allow comma or dot decimals, trim spaces
  if (!value) return NaN;
  value = value.trim().replace(",", ".");
  return parseFloat(value);
}

function toCelsius(value, unit) {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return (value - 32) * 5 / 9;
  if (unit === "kelvin") return value - 273.15;
  return NaN;
}

function fromCelsius(c, unit) {
  if (unit === "celsius") return c;
  if (unit === "fahrenheit") return (c * 9 / 5) + 32;
  if (unit === "kelvin") return c + 273.15;
  return NaN;
}

function formatNumber(n) {
  // show up to 2 decimal places, remove trailing zeros
  return Number.isFinite(n) ? parseFloat(n.toFixed(2)).toString() : "—";
}

function convertTemperature() {
  const raw = tempInput.value;
  const val = parseNumber(raw);

  if (isNaN(val)) {
    result.innerHTML = `<span style="color:#ffb4b4">❌ Please enter a valid number</span>`;
    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;

  const c = toCelsius(val, from);

  if (!Number.isFinite(c)) {
    result.innerHTML = `<span style="color:#ffb4b4">Conversion error</span>`;
    return;
  }

  if (to === "all") {
    const f = fromCelsius(c, "fahrenheit");
    const k = fromCelsius(c, "kelvin");
    result.innerHTML = `
      <strong>${formatNumber(val)}</strong> ${unitLabel(from)} =
      <strong>${formatNumber(f)}</strong> °F &nbsp;|&nbsp;
      <strong>${formatNumber(k)}</strong> K
    `;
  } else {
    const out = fromCelsius(c, to);
    result.innerHTML = `<strong>${formatNumber(val)}</strong> ${unitLabel(from)} = <strong>${formatNumber(out)}</strong> ${unitLabelShort(to)}`;
  }
}

function unitLabel(unit) {
  if (unit === "celsius") return "°C";
  if (unit === "fahrenheit") return "°F";
  if (unit === "kelvin") return "K";
  return unit;
}

function unitLabelShort(unit) {
  return unitLabel(unit);
}

// Event listeners
convertBtn.addEventListener("click", convertTemperature);
clearBtn.addEventListener("click", () => {
  tempInput.value = "";
  result.innerHTML = "";
  tempInput.focus();
});

// Bonus: press Enter to convert
tempInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") convertTemperature();
});
