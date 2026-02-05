export interface HousingLocation {
  id: number | string;
  name: string;
  city: string;
  state: string
  photo: string
  availableUnits: number
  wifi: boolean
  laundry: boolean
  price: number;
  available: boolean;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}
