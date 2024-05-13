export interface Contact {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
