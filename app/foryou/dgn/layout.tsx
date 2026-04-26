export default function TossLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="preload"
        href="/video/hero_dangn_2.mp4"
        as="video"
        type="video/mp4"
      />
      {children}
    </>
  );
}
