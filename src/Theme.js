import { createGlobalStyle } from 'styled-components';

const lightTheme = {
  body: '#fff',
  fontColor: '#000',
  borderColor: 'rgba(0, 0, 0, 0.349)',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
};

const darkTheme = {
  body: '#000',
  fontColor: '#fff',
  borderColor: 'rgba(187, 187, 187, 0.349)',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
};

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.fontColor};
        transition: all 0.2s linear;
    }

    button {
      cursor: pointer;
    }
`;

export { lightTheme, darkTheme, GlobalStyles };
