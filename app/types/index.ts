import { Car, CarReview, Image, User } from "@prisma/client";

export type SafeImage = Omit<Image, "createdAt"> & {
  createdAt: string;
};

export type SafeCarReview = Omit<CarReview, "createdAt"> & {
  createdAt: string;
};

export type SafeCar = Omit<Car, "createdAt"> & {
  createdAt: string;
  images: SafeImage;
  reviews: SafeCarReview;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
