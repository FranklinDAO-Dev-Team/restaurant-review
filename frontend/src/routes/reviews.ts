import axios from "axios";
import { BASE_SERVER_URL } from "../utils/env";

export const getReviewsByRestaurantId = async (restaurantId: number) => {
  const result = await axios.get(
    `${BASE_SERVER_URL}/api/reviews/${restaurantId}`
  );
  return result.data;
};
