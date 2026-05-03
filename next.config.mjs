/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  sassOptions: {
    additionalData: `
      @mixin hover {
        @media (hover: hover) and (pointer: fine) {
          &:hover { @content; }
        }
      }
    `,
  },
};

export default nextConfig;
