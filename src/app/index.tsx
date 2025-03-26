import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import { store } from "./store.ts";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "../shared/config/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
