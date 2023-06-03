export interface BaseRestaurant {
  id: number;
  cityId: number;
  restaurantAddress: string;
  restaurantName: string;
  longitude: number;
  latitude: number;
}

export interface Restaurant extends BaseRestaurant {
  averageRating: number;
  numberOfReviews: number;
}
