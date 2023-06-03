import {
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Restaurant } from "../types/Restaurant";
import { Review } from "../types/Review";
import { getReviewsByRestaurantId } from "../routes/reviews";
import { ReviewCard } from "./ReviewCard";

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
    <Card variant="outlined" sx={{ padding: "1rem", minWidth: "30rem" }}>
      <CardContent>
        <Typography variant="h4">{restaurant.restaurantName}</Typography>
        <Typography variant="h6" sx={{ color: "yellow", marginBottom: "1rem" }}>
          {restaurant.restaurantAddress}
        </Typography>
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
