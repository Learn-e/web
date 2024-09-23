import HeroVideoDialog from "../magicui/hero-video-dialog";

export default function HeroHeaderVideo() {
  return (
    <div className="relative mt-8">
      <HeroVideoDialog
        className="block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
