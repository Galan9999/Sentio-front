import { createGlobalStyle } from "styled-components";
import "@fontsource/belleza";

const GlobalStyles = createGlobalStyle`
* {
box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Belleza', sans serif;
  padding: 20px 10px;
  background-color: white;
  min-height: 100vh;
}
ul,
ol,
li {
  margin: 0;
  padding: 0;
  list-style: none;
  
}
button {
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  border: none;
}
h1,
h2 {
  font-size: 30px;
  margin: 0;
}
`;

export default GlobalStyles;
