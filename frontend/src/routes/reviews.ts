import axios from "axios";
import { BASE_SERVER_URL } from "../utils/env";

export const getReviewsByRestaurantId = async (restaurantId: number) => {
  const result = await axios.get(
    `${BASE_SERVER_URL}/api/reviews/${restaurantId}`
  );
  return result.data;
};

export const createReviewMetadata = async (comment: string, files: File[]) => {
  const formData = new FormData();
  formData.append("comment", comment);
  files.forEach((file) => {
    formData.append(`files`, file);
  });

  const result = await axios.post(
    `${BASE_SERVER_URL}/api/reviews/metadata`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return result.data;
};
