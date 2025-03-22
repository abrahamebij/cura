import React from "react";
import Image from "next/image";

const Img = ({ src, alt, className, priority, props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={`w-full h-auto ${className}`}
      priority={priority ?? false}
      {...props}
    />
  );
};

export default Img;
