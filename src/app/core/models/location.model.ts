export type LocationCategory = 'restaurant' | 'attraction' | 'hotel' | 'cafe' | 'other';

export interface Location {
  id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  category: LocationCategory;
  google_place_id: string | null;
  photo_url: string | null;
  rating: number | null;
}

export interface SearchLocationsParams {
  keyword?: string;
  category?: LocationCategory;
  lat?: number;
  lng?: number;
  radius?: number;
}
