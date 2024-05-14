import Image from "next/image";

interface PropsBannerPromo  {
  alt: string;
  src: string;
}

export const BannerPromo = ({alt, src}: PropsBannerPromo) => {
  return (
    <div className="mx-auto">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-lg"
        quality={100}
        alt={alt}
        src={src}
      />
    </div>
  );
};
