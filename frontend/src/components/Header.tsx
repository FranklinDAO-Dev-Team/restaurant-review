import { Paper, Typography } from "@mui/material";

function Header() {
  return (
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
  );
}

export default Header;
