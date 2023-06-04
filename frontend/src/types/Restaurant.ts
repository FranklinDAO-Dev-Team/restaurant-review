export interface BaseRestaurant {
  id: number;
  cityId: number;
  restaurantAddress: string;
  restaurantName: string;
}

export interface Restaurant extends BaseRestaurant {
  longitude: number;
  latitude: number;
  averageRating: number;
  numberOfReviews: number;
}
