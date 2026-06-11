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
          It takes about a minute. We&rsquo;ll follow up with your team placement
          and day-of details.
        </p>
      </div>
      <div className="formcard">
        <RegistrationForm />
      </div>
    </div>
  );
}
