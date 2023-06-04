import { Card, CardActionArea, Typography } from "@mui/material";
import { useAccount, useConnect } from "wagmi";

interface AddRestaurantButtonProps {
  onClick: () => void;
}

function AddRestaurantButton({ onClick }: AddRestaurantButtonProps) {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  const metamaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  return (
    <Card variant="outlined">
      <CardActionArea
        sx={{ padding: "1rem" }}
        onClick={
          isConnected
            ? onClick
            : () => connect({ connector: metamaskConnector })
        }
      >
        <Typography align="center" variant="h5">
          Missing something? Add a restaurant!
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export { AddRestaurantButton };
