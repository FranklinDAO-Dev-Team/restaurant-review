import { StarBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../utils/env";
import { RESTAURANT_REVIEW_CONTRACT } from "../utils/RestaurantReview";
import { useDebounce } from "../utils/debounce";

interface AddRestaurantDialogProps {
  cityId: number;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function AddRestaurantDialog({
  cityId,
  open,
  onClose,
  onSuccess,
}: AddRestaurantDialogProps) {
  const [restaurant, setRestaurant] = useState({
    restaurantName: "",
    restaurantAddress: "",
    rating: 0,
    comment: "",
  });
  const debouncedRestaurant = useDebounce(restaurant, 500);

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: RESTAURANT_REVIEW_CONTRACT.abi,
    functionName: "createRestaurantAndReview",
    args: [
      cityId,
      debouncedRestaurant.restaurantAddress,
      debouncedRestaurant.restaurantName,
      debouncedRestaurant.rating,
      debouncedRestaurant.comment,
    ],
    enabled: Boolean(
      debouncedRestaurant.restaurantName &&
        debouncedRestaurant.restaurantAddress &&
        debouncedRestaurant.rating
    ),
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 5000);
    }
  }, [isSuccess, onSuccess]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: 40 }}>Add a Restaurant!</DialogTitle>
      <DialogContent sx={{ width: "550px" }}>
        <Stack spacing={1}>
          <TextField
            value={restaurant.restaurantName}
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                restaurantName: event.target.value,
              })
            }
            variant="outlined"
            placeholder="What's the name of the restaurant?"
          />
          <TextField
            value={restaurant.restaurantAddress}
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                restaurantAddress: event.target.value,
              })
            }
            variant="outlined"
            placeholder="What's the restaurant's address?"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              border: "solid",
              borderWidth: "1px",
              borderRadius: "4px",
              borderColor: "rgba(0, 0, 0, 0.23)",
            }}
          >
            <Typography variant="h5">How&apos;d the food taste?</Typography>
            <Rating
              emptyIcon={
                <StarBorder fontSize="inherit" sx={{ color: "white" }} />
              }
              size="large"
              value={restaurant.rating}
              onChange={(_event, value) =>
                setRestaurant({
                  ...restaurant,
                  rating: Number(value),
                })
              }
            />
          </Box>
          <TextField
            variant="outlined"
            placeholder="Any comments?"
            value={restaurant.comment}
            onChange={(event) => {
              setRestaurant({
                ...restaurant,
                comment: event.target.value,
              });
            }}
          />
          <Button
            variant="outlined"
            sx={{ fontSize: "24px" }}
            onClick={() => write?.()}
            disabled={!write || isLoading}
          >
            {isLoading ? <CircularProgress /> : "Add Restaurant"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export { AddRestaurantDialog };
