export default function Partners() {
  return (
    <section className="partners">
      <div className="partners__inner">
        <span className="partner-strip__label">In partnership with</span>
        <div className="partner-strip">
          <div className="partner-tile partner-tile--alumni">
            <img src="/assets/nfl-alumni.svg" alt="NFL Alumni Association" />
          </div>
          <div className="partner-tile">
            <img src="/assets/nflpa.png" alt="NFL Players Association" />
          </div>
          <div className="partner-tile">
            <img src="/assets/logo-ohp-color.svg" alt="The One House Project" />
          </div>
        </div>
      </div>
    </section>
  );
}
