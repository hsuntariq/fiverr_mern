import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/Context.jsx";
import { ThemeProvider } from "./context/ThemeContent.jsx";
import { Provider } from 'react-redux'
import { store } from './store/store';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </Provider>
);
