import Image from "next/image";

type ProjectImagesProps = {
  images: string[];
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  quality?: number;
};

export default function ProjectImages({
  images,
  alt,
  sizes,
  className = "",
  imageClassName = "object-contain sharp-image",
  quality = 90,
}: ProjectImagesProps) {
  if (images.length === 0) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-dark via-dark-surf to-secondary/40 ${className}`}
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted sm:text-xs">Coming soon</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <Image src={images[0]} alt={alt} fill className={imageClassName} sizes={sizes} quality={quality} />
      </div>
    );
  }

  return (
    <div className={`grid h-full w-full grid-cols-2 gap-px bg-border/40 ${className}`}>
      {images.map((src, index) => (
        <div key={src} className="relative min-h-0 bg-dark-surf">
          <Image
            src={src}
            alt={`${alt} ${index + 1}`}
            fill
            className={imageClassName}
            sizes={sizes}
            quality={quality}
          />
        </div>
      ))}
    </div>
  );
}
