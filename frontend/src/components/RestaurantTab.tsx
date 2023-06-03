import { Card, CardActionArea, Rating, Stack, Typography } from "@mui/material";
import { StarBorder } from "@mui/icons-material";
import { Restaurant } from "../types/Restaurant";

interface RestaurantTabProps {
  restaurant: Restaurant;
  onRestaurantClick: (restaurant: Restaurant) => void;
}

function RestaurantTab({
  restaurant,
  onRestaurantClick: setActiveRestaurant,
}: RestaurantTabProps) {
  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => setActiveRestaurant(restaurant)}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <Typography variant="h5">{restaurant.restaurantName}</Typography>
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <Rating
              value={restaurant.averageRating}
              readOnly
              emptyIcon={
                <StarBorder fontSize="inherit" sx={{ color: "white" }} />
              }
            />
            <Typography
              variant="h6"
              sx={{ color: "yellow", whiteSpace: "nowrap" }}
            >
              {restaurant.averageRating} ({restaurant.numberOfReviews})
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export { RestaurantTab };
