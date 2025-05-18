// Populate currencies
const currencyList = ["USD", "EUR", "GBP", "KES", "INR", "JPY", "AUD", "CAD", "ZAR", "CNY"];

const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");

currencyList.forEach(currency => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.textContent = currency;
  fromSelect.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.textContent = currency;
  toSelect.appendChild(option2);
});

// Set defaults
fromSelect.value = "USD";
toSelect.value = "KES";

// Convert
function convertCurrency() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const amount = parseFloat(document.getElementById("amount").value);
  const resultBox = document.getElementById("resultBox");
  const loader = document.getElementById("loader");

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount.");
    return;
  }

  loader.style.display = "block";

  fetch(`https://open.er-api.com/v6/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";

      if (data.result !== "success") {
        throw new Error("API call failed");
      }

      const rate = data.rates[to];
      if (!rate) {
        resultBox.textContent = "Currency not supported.";
        return;
      }

      const converted = (amount * rate).toFixed(2);
      resultBox.textContent = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(err => {
      loader.style.display = "none";
      resultBox.textContent = "Conversion failed. See console.";
      console.error("Conversion error:", err);
    });
}
