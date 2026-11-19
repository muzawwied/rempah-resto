const nextConfig = {
  reactStrictMode: true,
  ...(process.env.NEXT_EXPORT === "1"
    ? { output: "export", images: { unoptimized: true }, trailingSlash: true }
    : {}),
};

export default nextConfig;
