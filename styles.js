import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --primary: #222c61;
    --secondary: #fafafa;
    --third: orange;
    --fourth:white;
  
    --primary-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    --secondary-shadow:0px -3px 5px rgba(0, 0, 0, 0.2);
    --third-shadow:0px 0px 5px rgba(0, 0, 0, 0.3);

  }

  html {
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  body {
    margin: 0;
    
  }
`;
