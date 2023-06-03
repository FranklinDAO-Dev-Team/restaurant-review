import {
  Card,
  CardContent,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Restaurant } from "../types/Restaurant";
import { Review } from "../types/Review";
import { getReviewsByRestaurantId } from "../routes/reviews";
import { ReviewCard } from "./ReviewCard";
import { StarBorder } from "@mui/icons-material";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = async () => {
    setReviews([]);
    setLoading(true);
    const response = await getReviewsByRestaurantId(restaurant.id);
    setLoading(false);
    setReviews(response);
  };

  useEffect(() => {
    loadReviews();
  }, [restaurant]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4">{restaurant.restaurantName}</Typography>
        <Typography variant="h6" sx={{ color: "yellow" }}>
          {restaurant.restaurantAddress}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", marginBottom: "1rem" }}
        >
          <Rating
            value={restaurant.averageRating}
            readOnly
            emptyIcon={
              <StarBorder fontSize="inherit" sx={{ color: "white" }} />
            }
          />
          <Typography variant="h6" sx={{ color: "yellow" }}>
            {restaurant.averageRating} ({restaurant.numberOfReviews}{" "}
            {restaurant.numberOfReviews === 1 ? "review" : "reviews"})
          </Typography>
        </Stack>
        {loading ? (
          <LinearProgress sx={{ width: "100%" }} />
        ) : (
          reviews.map((review) => <ReviewCard review={review} />)
        )}
      </CardContent>
    </Card>
  );
}

export { RestaurantCard };
