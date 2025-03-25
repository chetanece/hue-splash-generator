
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App.tsx';
import './index.css';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
