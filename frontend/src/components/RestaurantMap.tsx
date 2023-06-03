import { Box, Card, CardContent } from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { Restaurant } from "../types/Restaurant";
import { City } from "../types/City";

interface RestaurantMapProps {
  cityData: City;
  setActiveRestaurant: (restaurant: Restaurant) => void;
}

function RestaurantMap({ cityData, setActiveRestaurant }: RestaurantMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current ? mapContainer.current : "",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [cityData.longitude, cityData.latitude],
      zoom: 11,
    });

    cityData.restaurants?.forEach((restaurant) => {
      new mapboxgl.Marker({
        color: "yellow",
      })
        .setLngLat([restaurant.longitude, restaurant.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).on("open", () => {
            setActiveRestaurant(restaurant);
          })
        )
        .addTo(map.current as mapboxgl.Map);
    });
  }, [cityData, setActiveRestaurant]);

  return (
    <Card>
      <CardContent>
        <Box ref={mapContainer} sx={{ minHeight: "500px" }} />
      </CardContent>
    </Card>
  );
}

export { RestaurantMap };
