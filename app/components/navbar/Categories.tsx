"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { IoCarSportOutline } from "react-icons/io5";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Toyota",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Nissan",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Honda",
    icon: IoCarSportOutline,
    description: "Honda Model",
  },
  {
    label: "BMW",
    icon: IoCarSportOutline,
    description: "BMW Model",
  },
  {
    label: "Subaru",
    icon: IoCarSportOutline,
    description: "Subaru Model",
  },
  {
    label: "Jeep",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Ford",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Land Rover",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Volvo",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Genesis",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "FIAT",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Mazda",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Mitsubishi",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Lexus",
    icon: IoCarSportOutline,
    description: "Toyota Model",
  },
  {
    label: "Other",
    icon: IoCarSportOutline,
    description: "Other Model",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
