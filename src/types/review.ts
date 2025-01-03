export type Review = {
  id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  date: string;
};
