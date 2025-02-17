import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiVolume2, FiVolumeX } from "react-icons/fi"; // For sound toggle icons

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description }) => {
  // Local sound toggle state for this video
  const [soundEnabled, setSoundEnabled] = useState(false);
  const toggleSound = () => setSoundEnabled((prev) => !prev);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {/* Video element with local sound control */}
      <video
        src={src}
        loop
        autoPlay
        muted={!soundEnabled} // Sound is toggled here
        className="absolute left-0 top-0 size-full object-contain"
      />

      {/* Sound Toggle Button Overlay */}
      <div
        onClick={toggleSound}
        className="absolute top-2 right-2 z-50 cursor-pointer text-white"
      >
        {soundEnabled ? <FiVolume2 size={20} /> : <FiVolumeX size={20} />}
      </div>

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            T1, formerly known as SK Telecom T1, is a South Korean League of Legends esports team. Lee "Faker" Sang-hyeok is a star player for T1. Faker is considered one of the greatest League of Legends players of all time.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/t12024.mp4"
            title={
              <>
                <div>2024 League of Legends </div>
                <div>World Championship</div>
              </>
            }
            description="In a thrilling conclusion at The O2 Arena in London, T1 faced BLG once more, emerging victorious with a 3–2 win to claim their fifth World Championship. Lee (Faker) Sang-hyeok, T1's legendary mid laner, was instrumental throughout the tournament and was named Finals MVP for the second time in his career."
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/t12023.mp4"
              title={
                <>
                  <div>2023 League of Legends </div>
                  <div>World Championship</div>
                </>
              }
              description="In 2023 Worlds, T1 dominated LPL teams, defeating LNG (3–0), JDG (3–1), and Weibo Gaming (3–0) in the finals to win their fourth championship. Zeus was named Finals MVP for his stellar performance."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/t12016.mp4"
              title={
                <>
                  <div>2016 League of Legends </div>
                  <div>World Championship</div>
                </>
              }
              description="In 2016 Worlds, T1 (then SK Telecom T1) made history by becoming the first team to win back-to-back World Championships. Led by Faker, they defeated Royal Never Give Up (3–1) in the quarterfinals, ROX Tigers (3–2) in the semifinals, and Samsung Galaxy (3–2) in the finals to claim their third Worlds title."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/fakerroll.mp4"
              title={<>Iconic Moment</>}
              description="During 2016 Worlds, Faker had a rare and funny moment during the player introductions where he rolled onto the stage in a playful cartwheel-like motion. This was totally out of character for him, as he was usually known for his serious and composed demeanor."
            />
          </BentoTilt>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/rebornfaker.mp4"
            title={<>Reborn</>}
            description="In 2017, Faker lost his World Championship title to SSG. It took nearly a decade before he reclaimed his throne in 2023. This edit captures his fall in 2017 and his triumphant return as the 2023 World Champion."
          />
        </BentoTilt>
      </div>
    </section>
  );
};

export default Features;
