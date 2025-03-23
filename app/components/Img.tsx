import React from "react";
import Image, { ImageProps } from "next/image";

type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
} & Omit<ImageProps, "src" | "alt" | "priority" | "className">;

const Img = ({
  src,
  alt,
  className = "",
  priority = false,
  ...rest
}: ImgProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={`w-full h-auto ${className}`}
      priority={priority}
      {...rest}
    />
  );
};

export default Img;
