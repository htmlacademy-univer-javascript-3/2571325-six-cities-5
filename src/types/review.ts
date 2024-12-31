export type Review = {
  id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  date: string;
};
