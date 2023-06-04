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

interface AddReviewDialogProps {
  restaurantId: number;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function AddReviewDialog({
  restaurantId,
  open,
  onClose,
  onSuccess,
}: AddReviewDialogProps) {
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const debouncedRestaurant = useDebounce(review, 500);

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: RESTAURANT_REVIEW_CONTRACT.abi,
    functionName: "createReview",
    args: [
      restaurantId,
      debouncedRestaurant.rating,
      debouncedRestaurant.comment,
    ],
    enabled: Boolean(debouncedRestaurant.rating),
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (open && isSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 5000);
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: 40 }}>Add a Restaurant!</DialogTitle>
      <DialogContent sx={{ width: "550px" }}>
        <Stack spacing={1}>
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
              value={review.rating}
              onChange={(_event, value) =>
                setReview({
                  ...review,
                  rating: Number(value),
                })
              }
            />
          </Box>
          <TextField
            variant="outlined"
            placeholder="Any comments?"
            value={review.comment}
            onChange={(event) => {
              setReview({
                ...review,
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
            {isLoading ? <CircularProgress /> : "Add Review"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export { AddReviewDialog };
