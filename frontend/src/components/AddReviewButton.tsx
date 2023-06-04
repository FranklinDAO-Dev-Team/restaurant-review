import { Card, CardActionArea, Typography } from "@mui/material";
import { useAccount, useConnect } from "wagmi";

interface AddReviewButtonProps {
  onClick: () => void;
}

function AddReviewButton({ onClick }: AddReviewButtonProps) {
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
          Add your own review!
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export { AddReviewButton };
