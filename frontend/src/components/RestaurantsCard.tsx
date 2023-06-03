import { Card, CardContent, List, TextField } from "@mui/material";
import { useState } from "react";
import { RestaurantTab } from "./RestaurantTab";
import { Restaurant } from "../types/Restaurant";

interface RestaurantsCardProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

function RestaurantsCard({
  restaurants,
  onRestaurantClick,
}: RestaurantsCardProps) {
  const [search, setSearch] = useState("");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

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
        <List sx={{ padding: 0 }}>
          {restaurants
            .filter((restaurant) => restaurant.restaurantName.includes(search))
            .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
            .slice(0, 6)
            .map((restaurant) => (
              <RestaurantTab
                restaurant={restaurant}
                onRestaurantClick={onRestaurantClick}
              />
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

export { RestaurantsCard };
