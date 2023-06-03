export interface Review {
  id: number;
  restaurantId: number;
  reviewer: string;
  rating: number;
  metadata?: string;
}
