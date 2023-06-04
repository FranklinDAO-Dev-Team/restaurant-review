import {
  Card,
  Rating,
  CardContent,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { StarBorder } from "@mui/icons-material";
import { Review } from "../types/Review";
import { BASE_SERVER_URL } from "../utils/env";

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Rating
          value={review.rating}
          readOnly
          emptyIcon={<StarBorder fontSize="inherit" sx={{ color: "white" }} />}
        />
        {review.parsedMetadata?.comment && (
          <Typography variant="body1">
            {review.parsedMetadata?.comment}
          </Typography>
        )}
        {review.parsedMetadata?.imageHashes && (
          <ImageList cols={3}>
            {review.parsedMetadata?.imageHashes?.map((imageHash) => (
              <ImageListItem key={imageHash}>
                <img
                  src={`${BASE_SERVER_URL}/api/reviews/images/${imageHash}`}
                  alt={imageHash}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </CardContent>
    </Card>
  );
}

export { ReviewCard };
