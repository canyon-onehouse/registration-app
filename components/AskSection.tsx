const facts = [
  { label: "Date", value: <>Monday, June 29, 2026</> },
  {
    label: "Location",
    value: (
      <>
        Canebrake Club
        <br />
        Athens, AL 35613
      </>
    ),
  },
  {
    label: "Format",
    value: (
      <>
        4-Person Scramble
        <br />
        10:00 AM Shotgun
      </>
    ),
  },
  { label: "Register By", value: <>Friday, June 26, 2026</> },
];

export default function AskSection() {
  return (
    <div className="ask__inner">
      <div className="ask__head">
        <span className="eyebrow">What &ldquo;The Fifth Shot&rdquo; Means</span>
        <h2>
          One round of golf, <em>for a great cause.</em>
        </h2>
        <p>
          Our teams play a four-person scramble. You&rsquo;ll join one as a fifth
          player and guest of honor — relaxed, friendly, and entirely covered.
          Every team you meet is helping raise money for families in North
          Alabama working their way back to stability.
        </p>
      </div>

      <div className="ask__grid">
        <div>
          <div className="covered-block">
            <span className="eyebrow">Your Day, On Us</span>
            <h3>What&rsquo;s covered</h3>
            <div className="covered">
              <div className="covered__item">
                <p className="covered__amt">Included</p>
                <p className="covered__name">Green fees &amp; cart</p>
              </div>
              <div className="covered__item">
                <p className="covered__amt">Included</p>
                <p className="covered__name">Lunch on the veranda</p>
              </div>
              <div className="covered__item">
                <p className="covered__amt">Included</p>
                <p className="covered__name">Drinks &amp; refreshments</p>
              </div>
            </div>
            <p className="covered-note">
              Entry is completely free for guests — there&rsquo;s nothing to pay,
              ever.
            </p>
          </div>

          <div className="prize-inline">
            <span className="eyebrow">On the Course</span>
            <h3 style={{ marginTop: 10 }}>Prizes &amp; eligibility</h3>
            <div className="prize-line">
              <span className="prize-line__amt">$10,000</span>
              <span className="prize-line__txt">
                The first-place grand prize is for competing teams.{" "}
                <strong>Guest spots don&rsquo;t qualify for it.</strong>
              </span>
            </div>
            <div className="prize-line">
              <span className="prize-line__amt">$5,000</span>
              <span className="prize-line__txt">
                In on-course prizes — wine, experiences, gift cards, clubs &amp;
                bags. <strong>Guests are welcome to play for these.</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="factbox">
          {facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <div className="fact__ico">
                <img src="/assets/symbol-ohp-glyph.svg" alt="" />
              </div>
              <div>
                <p className="fact__lbl">{fact.label}</p>
                <p className="fact__val">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
