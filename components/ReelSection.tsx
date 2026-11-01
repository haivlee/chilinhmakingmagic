export default function ReelSection() {
  const frameClassName = "rounded-[16px] border border-black/10";

  return (
    <div
      className={`relative aspect-video overflow-hidden bg-black ${frameClassName}`}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src="https://player.vimeo.com/video/899392906?title=0&byline=0&portrait=0"
        title="Chi-Linh Tran showreel 2024"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
