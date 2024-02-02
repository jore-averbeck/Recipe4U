import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
   
  }

  html {
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  body {
    margin: 0;
    
  }
`;
