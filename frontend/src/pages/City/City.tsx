import { Box, Grid, LinearProgress, List, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Restaurant } from "../../types/Restaurant";
import { getRestaurantsByCountryAndCityName } from "../../routes/restaurants";
import { RestaurantsCard } from "../../components/RestaurantsCard";
import { RestaurantCard } from "../../components/RestaurantCard";

interface CityData {
  restaurants: Restaurant[];
}

function City() {
  const { countryName, cityName } = useParams();

  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(
    null
  );

  const loadCityData = async () => {
    setLoading(true);

    const restaurants = await getRestaurantsByCountryAndCityName(
      countryName || "",
      cityName || ""
    );

    setLoading(false);
    setCityData({ restaurants });
    setActiveRestaurant(null);
  };

  useEffect(() => {
    if (cityData != null) return;

    loadCityData();
  }, [cityData]);

  const onRestaurantClick = (restaurant: Restaurant) => {
    if (activeRestaurant?.id === restaurant.id) {
      setActiveRestaurant(null);
    } else {
      setActiveRestaurant(restaurant);
    }
  };

  if (loading) {
    return (
      <>
        <Typography variant="h3">Lookin around...</Typography>
        <Box
          sx={{
            width: "50%",
          }}
        >
          <LinearProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Typography variant="h3">
        Found u some <span style={{ color: "yellow" }}>{cityName}</span> grub:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div />
        </Grid>
        <Grid item xs={4}>
          <RestaurantsCard
            restaurants={cityData?.restaurants || []}
            onRestaurantClick={onRestaurantClick}
          />
        </Grid>
        <Grid item xs={4}>
          {activeRestaurant && <RestaurantCard restaurant={activeRestaurant} />}
        </Grid>
      </Grid>
    </>
  );
}

export { City };
