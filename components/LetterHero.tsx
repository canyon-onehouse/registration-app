import Image from "next/image";
import headshot from "@/assets/bo-headshot.jpeg";

export default function LetterHero() {
  return (
    <section className="letter-wrap">
      <article className="letter">
        <div className="letter__portrait">
          <Image
            src={headshot}
            alt="Bo Matthews"
            fill
            priority
            sizes="(max-width: 920px) 100vw, 520px"
          />
          <div className="letter__portrait-cap">
            <p className="letter__portrait-name">Bo Matthews</p>
            <p className="letter__portrait-role">
              Your Host · Nine-year NFL Veteran
            </p>
          </div>
        </div>
        <div className="letter__body">
          <span className="eyebrow">A Personal Invitation</span>
          <p className="letter__greet">Friends —</p>
          <p>
            I spent nine years in the NFL, and I was lucky enough to hear my
            name called second in the 1974 Draft. But the work I&rsquo;m proudest of
            is back home in Huntsville, where I founded The One House Project
            to help our neighbors find their footing.
          </p>
          <p>
            This June, we&rsquo;re hosting our very first charity golf tournament —
            and I&rsquo;d love for you to join us as a special guest. You&rsquo;d play as
            the <em>fifth shot</em> on a team: a celebrity in the rotation,
            swinging alongside folks who&rsquo;ll never forget the day.
          </p>
          <p>
            It won&rsquo;t cost you a thing. Your green fees, your food, your drinks
            — all on us. All I&rsquo;m really asking for is your name beside a good
            cause. And if you&rsquo;d rather keep things quiet, that&rsquo;s perfectly
            fine too.
          </p>
          <p>It would mean the world to have you out there.</p>
          <p className="letter__sign">— Bo</p>
          <p className="letter__sign-role">
            Bo Matthews · Founder &amp; Board Chair, The One House Project
          </p>
          <div className="letter__cta">
            <a className="hh-btn hh-btn--gold" href="#register">
              <span>Count Me In — It&rsquo;s Free</span>
            </a>
            <a className="hh-btn hh-btn--outline" href="#details">
              <span>The Details</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
