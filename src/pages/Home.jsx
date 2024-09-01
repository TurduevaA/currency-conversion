import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const Home = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency] = useOutletContext();

  useEffect(() => {
    const API_KEY = "5b5afb2c2df74c2f7e641c53";

    fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.conversion_rates) {
          setRates(data.conversion_rates);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, [baseCurrency]);

  const renderRates = () => {
    if (!rates) {
      return <p>Загрузка...</p>;
    }

    const currencyKeys = ["USD", "EUR", "RUB"];
    return currencyKeys.map((currency) => {
      if (currency === baseCurrency) return null;

      const rate = rates[currency] / rates[baseCurrency];

      return (
        <p key={currency}>
          1 {currency} = {rate.toFixed(2)} {baseCurrency}
        </p>
      );
    });
  };

  return (
    <div>
      <h1>Курсы валют относительно {baseCurrency}</h1>
      {renderRates()}
    </div>
  );
};
