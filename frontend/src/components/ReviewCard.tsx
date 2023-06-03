import { Card, Rating, CardContent, Typography } from "@mui/material";
import { StarBorder } from "@mui/icons-material";
import { Review } from "../types/Review";

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
        <Typography variant="body1">{review.metadata}</Typography>
      </CardContent>
    </Card>
  );
}

export { ReviewCard };
