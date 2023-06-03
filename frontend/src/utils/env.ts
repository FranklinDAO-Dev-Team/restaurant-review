import mapboxgl from "mapbox-gl";

const BASE_SERVER_URL =
  import.meta.env.VITE_BASE_SERVER_URL || "http://localhost:3000";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

export { BASE_SERVER_URL };
