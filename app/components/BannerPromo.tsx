import Image, { ImageProps } from "next/image";
import React from "react";

export const BannerPromo = (props: ImageProps) => {
  return (
    <span>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
        quality={100}
        {...props}
      />
    </span>
  );
};
