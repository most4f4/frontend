import Image from 'next/image';

function ExampleCarouselImage({ src, alt}) {
    return (
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={1600}
        height={400}
      />
    );
  }

export default ExampleCarouselImage;
