export interface ReviewMetadata {
  comment: string;
  imageHashes: string[];
}

export interface Review {
  id: number;
  restaurantId: number;
  reviewer: string;
  rating: number;
  metadata: string;
  parsedMetadata?: ReviewMetadata;
}
