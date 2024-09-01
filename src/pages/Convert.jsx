import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import styled from "styled-components";

export const Convert = () => {
  const [currencyOptions, setCurrencyOptions] = useState(["RUB", "USD", "EUR"]);
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/5b5afb2c2df74c2f7e641c53/latest/USD`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.conversion_rates) {
          setRates(data.conversion_rates);
          setCurrencyOptions(Object.keys(data.conversion_rates));
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const validateInput = (value) => {
    if (isNaN(value)) {
      return "Ввод должен быть числом.";
    } else if (value < 0) {
      return "Значение должно быть больше или равно нулю.";
    }
    return "";
  };

  const handleFromAmountChange = (value) => {
    const errorMessage = validateInput(value);
    setError(errorMessage);

    if (errorMessage) {
      setFromAmount(value);
      return;
    }

    setFromAmount(value);
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = (rates[toCurrency] / rates[fromCurrency]) * value;
      setToAmount(rate.toFixed(2));
    } else {
      setError("Rates not available for selected currencies.");
    }
  };

  const handleToAmountChange = (value) => {
    const errorMessage = validateInput(value);
    setError(errorMessage);

    if (errorMessage) {
      setToAmount(value);
      return;
    }

    setToAmount(value);
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = (rates[fromCurrency] / rates[toCurrency]) * value;
      setFromAmount(rate.toFixed(2));
    } else {
      setError("Rates not available for selected currencies.");
    }
  };

  return (
    <Container>
      <Title>Конвертация валют</Title>
      <Row>
        <StyledFormControl variant="outlined">
          <InputLabel>Из</InputLabel>
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            label="Из"
          >
            {currencyOptions.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledTextField
          variant="outlined"
          value={fromAmount}
          onChange={(e) => handleFromAmountChange(e.target.value)}
          placeholder="Введите сумму"
        />
      </Row>
      <Row>
        <StyledFormControl variant="outlined">
          <InputLabel>В</InputLabel>
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            label="В"
          >
            {currencyOptions.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledTextField
          variant="outlined"
          value={toAmount}
          onChange={(e) => handleToAmountChange(e.target.value)}
          placeholder="Введите сумму"
        />
      </Row>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f4f4f9;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 150px;
  background-color: #fff;
  border-radius: 4px;
`;

const StyledTextField = styled(TextField)`
  background-color: #fff;
  border-radius: 4px;

  & .MuiOutlinedInput-root {
    border-color: #007bff;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #0056b3;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #0056b3;
    }
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;
