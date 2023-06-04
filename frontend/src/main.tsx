import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { WagmiConfig } from "wagmi";
import App from "./App";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import { theme } from "./utils/theme";
import { wagmiConfig } from "./utils/wagmi";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <CssBaseline />
        <App />
      </WagmiConfig>
    </ThemeProvider>
  </React.StrictMode>
);
