import { Box, LinearProgress, List, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Restaurant } from "../../types/Restaurant";
import { getRestaurantsByCountryAndCityName } from "../../routes/restaurants";
import { RestaurantCard } from "../../components/RestaurantCard";

interface CityData {
  restaurants: Restaurant[];
}

function City() {
  const { countryName, cityName } = useParams();

  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState<CityData | null>(null);

  const loadCityData = async () => {
    setLoading(true);

    const restaurants = await getRestaurantsByCountryAndCityName(
      countryName || "",
      cityName || ""
    );

    setLoading(false);
    setCityData({ restaurants });
  };

  useEffect(() => {
    if (cityData != null) return;

    loadCityData();
  }, [cityData]);

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
      <List>
        {cityData?.restaurants?.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </List>
    </>
  );
}

export { City };
