import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from 'components/pages/Login';
import Home from 'components/pages/Home';
import LightTheme from 'themes/light';
import DarkTheme from 'themes/dark';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${p => p.theme.bodyBackgroundColor};
    /* min-height: 100vh; */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${p => p.theme.bodyFontColor};
    font-family: 'Kaushan Script';
  }
`;

function App() {
  const [theme, setTheme] = useState(LightTheme);

  return (
    <ThemeProvider theme={{
      ...theme, setTheme: () => {
        setTheme(t => t.id === 'light' ? DarkTheme : LightTheme);
      }
    }}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
