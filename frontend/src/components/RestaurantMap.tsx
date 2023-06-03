import { Box, Card, CardContent } from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { Restaurant } from "../types/Restaurant";

interface RestaurantMapProps {
  restaurants: Restaurant[];
}

function RestaurantMap({ restaurants }: RestaurantMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);

  const restaurantLocations = useState([]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current ? mapContainer.current : "",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });
  });

  return (
    <Card>
      <CardContent>
        <Box ref={mapContainer} sx={{ minHeight: "500px" }} />
      </CardContent>
    </Card>
  );
}

export { RestaurantMap };
