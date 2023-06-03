import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Restaurant } from "../../types/Restaurant";
import { getRestaurantsByCountryAndCityName } from "../../routes/restaurants";
import { RestaurantsCard } from "../../components/RestaurantsCard";
import { RestaurantCard } from "../../components/RestaurantCard";
import { RestaurantMap } from "../../components/RestaurantMap";
import { getCityByCountryNameAndCityName } from "../../routes/cities";
import { City } from "../../types/City";

function CityPage() {
  const { countryName, cityName } = useParams();

  const [loading, setLoading] = useState(true);
  const [cityData, setCityData] = useState<City>({
    id: 0,
    countryName: "",
    cityName: "",
    longitude: 0,
    latitude: 0,
  });
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(
    null
  );

  const loadCityData = async () => {
    if (!countryName || !cityName) return;

    setLoading(true);

    const rawCityData = await getCityByCountryNameAndCityName(
      countryName,
      cityName
    );

    const restaurants = await getRestaurantsByCountryAndCityName(
      countryName,
      cityName
    );

    setLoading(false);
    setCityData({ ...rawCityData, restaurants: restaurants });
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

  const restaurants = cityData?.restaurants || [];

  return (
    <>
      <Typography variant="h3">
        Found u some <span style={{ color: "yellow" }}>{cityName}</span> grub:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <RestaurantMap
            cityData={cityData}
            setActiveRestaurant={setActiveRestaurant}
          />
        </Grid>
        <Grid item xs={4}>
          <RestaurantsCard
            restaurants={restaurants}
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

export { CityPage };
