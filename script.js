const API_KEY = "aefb22e2a5e477a0df728139";

document.getElementById("convert").addEventListener("click", function () {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;

  const euroToITL = 1936.27;
  const euroToGRD = 340.75;

  // אם אותו מטבע
  if (from === to) {
    document.getElementById("result").innerText = "SameSameNewName";
    return;
  }

  // המרה ממטבע היסטורי (ITL → כל דבר)
  if (from === "ITL") {
    const euroAmount = amount / euroToITL;
    convertFromEuro(euroAmount, to);
    return;
  }

  if (from === "GRD") {
    const euroAmount = amount / euroToGRD;
    convertFromEuro(euroAmount, to);
    return;
  }

  // המרה למטבע היסטורי (כל דבר → ITL / GRD)
  if (to === "ITL") {
    convertToEuro(amount, from, euroToITL, "ITL");
    return;
  }

  if (to === "GRD") {
    convertToEuro(amount, from, euroToGRD, "GRD");
    return;
  }

  // המרה רגילה
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

// פונקציה להמרה מאירו למטבע מודרני
function convertFromEuro(euroAmount, to) {
  fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/EUR`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[to];
      const result = euroAmount * rate;
      document.getElementById("result").innerText = `${(result).toFixed(2)} ${to}`;
    })
    .catch(error => {
      console.error("Error converting from historical currency:", error);
      document.getElementById("result").innerText = "ERROR😞";
    });
}

// פונקציה להמרה למטבע היסטורי דרך אירו
function convertToEuro(amount, from, multiplier, label) {
  fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const euroAmount = amount * data.conversion_rates["EUR"];
      const result = euroAmount * multiplier;
      document.getElementById("result").innerText = `${result.toFixed(2)} ${label}`;
    })
    .catch(error => {
      console.error("Error converting to historical currency:", error);
      document.getElementById("result").innerText = "ERROR😞";
    });
}
