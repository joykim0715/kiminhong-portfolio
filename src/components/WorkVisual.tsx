import type { Work } from "@/data/content";
import { getWorkImages, getWorkTypographyCover } from "@/lib/workImages";
import ProjectImages from "./ProjectImages";
import WorkTypographyCover from "./WorkTypographyCover";

type WorkVisualProps = {
  work: Work;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  quality?: number;
  priority?: boolean;
};

export default function WorkVisual({
  work,
  alt,
  sizes,
  className,
  imageClassName,
  quality,
  priority,
}: WorkVisualProps) {
  const cover = getWorkTypographyCover(work);
  if (cover) {
    return (
      <div className={`relative h-full w-full min-h-0 ${className ?? ""}`}>
        <WorkTypographyCover cover={cover} />
      </div>
    );
  }

  return (
    <ProjectImages
      images={getWorkImages(work)}
      alt={alt}
      sizes={sizes}
      className={className}
      imageClassName={imageClassName}
      quality={quality}
      priority={priority}
    />
  );
}
