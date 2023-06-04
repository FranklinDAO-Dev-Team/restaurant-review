import { Box, Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { Header } from "./components/Header";
import { CityPage } from "./pages/City/CityPage";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        padding: 3,
        margin: 0,
        backgroundColor: "rgb(50, 50, 50)",
      }}
    >
      <Container
        sx={{
          flexDirection: "column",
          justifyContent: "left",
          rowGap: "2rem",
        }}
        maxWidth={false}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:countryName/:cityName" element={<CityPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Box>
  );
}

export default App;
