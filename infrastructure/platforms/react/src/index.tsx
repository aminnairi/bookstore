import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);