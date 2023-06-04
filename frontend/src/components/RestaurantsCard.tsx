import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RestaurantTab } from "./RestaurantTab";
import { Restaurant } from "../types/Restaurant";
import { AddRestaurantButton } from "./AddRestaurantButton";
import { AddRestaurantDialog } from "./AddRestaurantDialog";

interface RestaurantsCardProps {
  cityId: number;
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
  reloadRestaurants: () => void;
}

const maxRestaurants = 5;

function RestaurantsCard({
  cityId,
  restaurants,
  onRestaurantClick,
  reloadRestaurants,
}: RestaurantsCardProps) {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const matchingRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.includes(search)
  );

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ minHeight: "500px" }}>
            <Stack sx={{ padding: 0 }} spacing={1}>
              <TextField
                value={search}
                variant="outlined"
                placeholder="Search..."
                sx={{ width: "100%" }}
                onChange={onSearchChange}
              />
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
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ color: "gray", padding: "1rem", paddingTop: "0.5rem" }}
                >
                  {matchingRestaurants.length - maxRestaurants} more...
                </Typography>
              )}
            </Stack>
            <AddRestaurantButton onClick={() => setDialogOpen(true)} />
          </Box>
        </CardContent>
      </Card>
      <AddRestaurantDialog
        cityId={cityId}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          setDialogOpen(false);
          reloadRestaurants();
        }}
      />
    </>
  );
}

export { RestaurantsCard };
