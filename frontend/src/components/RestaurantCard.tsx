import { Card, CardActionArea, Rating, Stack, Typography } from "@mui/material";
import { Restaurant } from "../types/Restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Typography variant="h5">{restaurant.restaurantName}</Typography>
          <Rating value={restaurant.averageRating} readOnly />
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export { RestaurantCard };
