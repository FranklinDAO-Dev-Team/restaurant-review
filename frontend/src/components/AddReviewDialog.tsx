import { StarBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import CloseIcon from "@mui/icons-material/Close";
import { CONTRACT_ADDRESS } from "../utils/env";
import { RESTAURANT_REVIEW_CONTRACT } from "../utils/RestaurantReview";
import { createReviewMetadata } from "../routes/reviews";

interface ReviewAttributes {
  rating: number;
  comment: string;
  files: File[];
}

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
  const [review, setReview] = useState<ReviewAttributes>({
    rating: 0,
    comment: "",
    files: [],
  });

  const { data, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: RESTAURANT_REVIEW_CONTRACT.abi,
    functionName: "createReview",
  });

  const submitReview = async () => {
    let metadataHash = "";
    if (review.comment || review.files.length > 0) {
      metadataHash = await createReviewMetadata(review.comment, review.files);
    }
    await write({
      args: [restaurantId, review.rating, metadataHash],
    });
  };

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
          {review.files.map((file) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "4px",
                borderColor: "rgba(0, 0, 0, 0.23)",
              }}
            >
              <Typography variant="h5">{file.name}</Typography>
              <IconButton
                onClick={() =>
                  setReview({
                    ...review,
                    files: review.files.filter((f) => f !== file),
                  })
                }
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            sx={{ fontSize: "24px", fontWeight: "regular" }}
            component="label"
          >
            Upload {review.files.length > 0 ? "another" : "a"} image
            <input
              type="file"
              hidden
              onChange={(event) => {
                if (event.target.files) {
                  setReview({
                    ...review,
                    files: [...review.files, ...event.target.files],
                  });
                }
              }}
            />
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: "24px" }}
            onClick={submitReview}
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
