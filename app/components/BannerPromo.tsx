import Image from "next/image";

interface PropsBannerPromo  {
  alt: string;
  src: string;
}

export const BannerPromo = ({alt, src}: PropsBannerPromo) => {
  return (
    <div className="h-full w-full sm:overflow-hidden md:h-[350px]">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full rounded-sm mx-auto md:h-[unset]"
        quality={100}
        alt={alt}
        src={src}
      />
    </div>
  );
};
