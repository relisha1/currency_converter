const accessKey = "cdacd03932c541f585438e1f3cf466a0"; // Replace with your actual key
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

console.log("Script loaded!");

// Load currencies
fetch(`https://api.currencyfreaks.com/latest?apikey=${accessKey}`)
  .then(res => res.json())
  .then(data => {
    const rates = data.rates;

    for (let code in rates) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.textContent = option2.textContent = code;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";

    console.log("Currencies loaded");
  })
  .catch(error => {
    result.textContent = "Error loading currencies.";
    console.error("Currency load error:", error);
  });

// Listen for clicks
convertBtn.addEventListener("click", () => {
  console.log("Convert button clicked");

  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  fetch(`https://api.currencyfreaks.com/latest?apikey=${accessKey}`)
    .then(res => res.json())
    .then(data => {
      const rates = data.rates;
      const rateFrom = parseFloat(rates[from]);
      const rateTo = parseFloat(rates[to]);

      if (!rateFrom || !rateTo) {
        result.textContent = `Could not find conversion rate for ${from} or ${to}.`;
        return;
      }

      const usdAmount = amount / rateFrom;
      const convertedAmount = usdAmount * rateTo;

      result.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    })
    .catch(error => {
      result.textContent = "Conversion failed.";
      console.error("Conversion error:", error);
    });
});