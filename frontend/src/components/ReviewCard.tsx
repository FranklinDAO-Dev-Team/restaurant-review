import { Card, Rating, CardContent, Typography } from "@mui/material";
import { Review } from "../types/Review";

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Rating value={review.rating} readOnly />
        <Typography variant="body1">{review.metadata}</Typography>
      </CardContent>
    </Card>
  );
}

export { ReviewCard };
