import Image from "next/image";
import foodDrive from "@/assets/bo-food-drive.jpeg";

export default function MissionStrip() {
  return (
    <>
      <div className="mission-strip__img">
        <Image
          src={foodDrive}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "44% 20%" }}
          sizes="(max-width: 920px) 100vw, 50vw"
        />
      </div>
      <div className="mission-strip__txt">
        <span className="eyebrow">Why It Matters</span>
        <h2>
          Every swing supports a family <em>rebuilding their life.</em>
        </h2>
        <p>
          The One House Project coordinates crisis-housing providers across
          North Alabama with the funding, services, and data they need to move
          families from instability to stability, faster and with dignity.
          Your day on the course helps fund that work.
        </p>
      </div>
    </>
  );
}
