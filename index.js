const CC = require('currency-converter-lt');
let currencyConverter = new CC({ from: "USD", to: "EUR", amount: 100 });

currencyConverter.convert().then((response) => {
    console.log(`Result: ${response}`);
});
