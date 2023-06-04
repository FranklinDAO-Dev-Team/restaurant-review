import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router";
import { WalletButton } from "./WalletButton";

function Header() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ width: "90%" }}>
        <Grid item xs={3}>
          {window.location.pathname !== "/" && (
            <Container sx={{ height: "100%", justifyContent: "right" }}>
              <Button variant="contained" onClick={() => navigate("/")}>
                Home
              </Button>
            </Container>
          )}
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              sx={{
                width: "fit-content",
                padding: "1rem",
              }}
            >
              <Typography variant="h2" fontWeight="bold" color="black">
                Restaurant Review 🥘
              </Typography>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <WalletButton />
        </Grid>
      </Grid>
    </Container>
  );
}

export { Header };
