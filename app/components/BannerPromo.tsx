import Image from "next/image";

interface PropsBannerPromo  {
  alt: string;
  src: string;
}

export const BannerPromo = ({alt, src}: PropsBannerPromo) => {
  return (
    <span>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
        quality={100}
        alt={alt}
        src={src}
      />
      
    </span>
  );
};
