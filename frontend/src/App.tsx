import { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import reactLogo from "./assets/react.svg";
import viteLogo from "../public/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
        backgroundColor: "#282c34",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: "fit-content",
            padding: "1rem",
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Restaurant Review 🥘
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
