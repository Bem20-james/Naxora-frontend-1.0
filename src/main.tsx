import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

import { Provider } from "react-redux";
import { store } from "./store";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
}
