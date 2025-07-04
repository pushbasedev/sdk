export type Property = {
  title: string;
  location: string;
  price: string;
  image: string;
};

export type RootStackParamList = {
  Home: undefined;
  Destination: { slug: string };
  Notifications: undefined;
};
