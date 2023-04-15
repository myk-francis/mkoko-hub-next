"use client";

import Image from "next/image";
import React from "react";

interface AvartarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvartarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      src={src || "/placeholder.jpg"}
      alt="avatar"
      width={30}
      height={30}
    />
  );
};

export default Avatar;
