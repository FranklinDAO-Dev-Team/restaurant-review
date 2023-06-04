import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function WalletButton() {
  const { connect, connectors, isLoading } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const metamaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  if (isConnected) {
    return (
      <Container sx={{ width: "100%", height: "100%", justifyContent: "left" }}>
        <Paper sx={{ width: "fit-content", padding: 1 }}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6" sx={{ color: "black" }}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Typography>
            <Button variant="contained" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ width: "100%", height: "100%", justifyContent: "left" }}>
      {metamaskConnector && (
        <Button
          disabled={!metamaskConnector.ready}
          variant="contained"
          onClick={() => connect({ connector: metamaskConnector })}
        >
          {isLoading ? <CircularProgress /> : "Connect Wallet"}
        </Button>
      )}
    </Container>
  );
}

export { WalletButton };
