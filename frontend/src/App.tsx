import { Box, Container, Paper, Typography } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Header from "./components/Header.tsx";
import City from "./pages/City/City.tsx";
import { cityLoader } from "./pages/City/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:countryName/:cityName",
    element: <City />,
    loader: cityLoader,
  },
]);

function App() {
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
          rowGap: "2rem",
        }}
      >
        <Header />
        <RouterProvider router={router} />
      </Container>
    </Box>
  );
}

export default App;
