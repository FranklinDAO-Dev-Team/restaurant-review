import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { RestaurantTab } from "./RestaurantTab";
import { Restaurant } from "../types/Restaurant";

interface RestaurantsCardProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const maxRestaurants = 5;

function RestaurantsCard({
  restaurants,
  onRestaurantClick,
}: RestaurantsCardProps) {
  const [search, setSearch] = useState("");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const matchingRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.includes(search)
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <TextField
          value={search}
          variant="outlined"
          placeholder="Search..."
          sx={{ width: "100%", paddingBottom: "1rem" }}
          onChange={onSearchChange}
        />
        <Stack sx={{ padding: 0 }} spacing={1}>
          {matchingRestaurants
            .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
            .slice(0, maxRestaurants)
            .map((restaurant) => (
              <RestaurantTab
                key={restaurant.id}
                restaurant={restaurant}
                onRestaurantClick={onRestaurantClick}
              />
            ))}
          {matchingRestaurants.length > maxRestaurants && (
            <Typography variant="h5" align="center" sx={{ color: "gray" }}>
              {matchingRestaurants.length - maxRestaurants} more...
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export { RestaurantsCard };
