import RegistrationForm from "./RegistrationForm";

export default function RegisterSection() {
  return (
    <div className="register__inner">
      <div className="register__head">
        <span className="eyebrow">Reserve Your Guest Spot</span>
        <h2>
          Say <em>yes</em>
        </h2>
        <p>
          A minute now, and we&rsquo;ll handle the rest — team placement and
          day-of details to follow.
        </p>
      </div>
      <div className="formcard">
        <RegistrationForm />
      </div>
    </div>
  );
}
