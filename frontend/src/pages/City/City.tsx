import { List, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { CityParams } from "./loader";

function City() {
  const data = useLoaderData();
  const { countryName, cityName, restaurants } = data as CityParams;

  return (
    <>
      <Typography variant="h3">
        Found u some <span style={{ color: "yellow" }}>{cityName}</span> grub:
      </Typography>
      <List>
        {restaurants?.map((restaurant) => (
          <Typography variant="h5" key={restaurant.id}>
            {restaurant.restaurantName}
          </Typography>
        ))}
      </List>
    </>
  );
}

export default City;
