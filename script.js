const API_KEY = "aefb22e2a5e477a0df728139";

document.getElementById("convert").addEventListener("click", function () {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;

  if (from === to) {
    document.getElementById("result").innerText = "ItsNotVariNais";
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[to];
      const result = amount * rate;
      document.getElementById("result").innerText = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    })
    .catch(error => {
      console.error("Error fetching exchange rate:", error);
      document.getElementById("result").innerText = "ERROR😞";
    });
});
