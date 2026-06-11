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
            This June we&rsquo;re hosting our first charity golf tournament, and
            I&rsquo;d love for you to join us as a special guest. You&rsquo;d play as
            the <em>fifth shot</em> on one of our teams, swinging in the
            rotation right alongside the players.
          </p>
          <p>
            It won&rsquo;t cost you a thing. Your green fees, your food, and your
            drinks are all on us. All I&rsquo;m asking is that you come play some
            golf with us. You don&rsquo;t have to be recognized or mentioned
            anywhere. Your presence alone will make the day a success and give
            our donors a reason to come back next year.
          </p>
          <p>I hope to see you out there.</p>
          <p className="letter__sign">— Bo</p>
          <div className="letter__sig-block">
            <p className="letter__sig-name">Bo Matthews</p>
            <p className="letter__sig-role">Founder &amp; Board Chairman</p>
            <img
              className="letter__sig-logo"
              src="/assets/logo-ohp-color.svg"
              alt="The One House Project"
            />
          </div>
          <div className="letter__cta">
            <a className="hh-btn hh-btn--gold" href="#register">
              <span>Count Me In · It&rsquo;s Free</span>
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
