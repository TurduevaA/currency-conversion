import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("RUB");

  return (
    <Container>
      <Header>
        <Nav>
          <Link to="/">Главная</Link>
          <Link to="/convert">Конвертация</Link>
        </Nav>
        <StyledFormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Валюта</InputLabel>
          <StyledSelect
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            label="Валюта"
          >
            <StyledMenuItem value="RUB">RUB</StyledMenuItem>
            <StyledMenuItem value="USD">USD</StyledMenuItem>
            <StyledMenuItem value="EUR">EUR</StyledMenuItem>
          </StyledSelect>
        </StyledFormControl>
      </Header>
      <Main>
        <Outlet context={[baseCurrency, setBaseCurrency]} />
      </Main>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f4f4f9;
`;

const Header = styled.header`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 50px;
  a {
    color: #0056b3;
    text-decoration: none;
    margin-right: 20px;
    font-size: 1.1em;
    transition: color 0.3s ease;

    &:hover {
      color: #00aaff;
    }
  }
`;

const Main = styled.main`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 150px;
  border-radius: 4px;

  & .MuiInputLabel-root {
    color: #0056b3;
    font-weight: bold;
  }

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

const StyledSelect = styled(Select)`
  color: #333;

  & .MuiOutlinedInput-input {
    padding: 10px;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #e0e0e0;
  }
`;
