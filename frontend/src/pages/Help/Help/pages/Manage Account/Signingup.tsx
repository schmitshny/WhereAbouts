import HelpHeader from "../../components/HelpHeader";

import switchtoSignUp from "../../../../../assets/help/switchtoSignUp.png";
import signupform from "../../../../../assets/help/signupform.png";

const Signingup = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Signing Up" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">
          Learn how to create a Whereabouts account to enjoy all the features.
        </p>
      </section>
      <ol>
        <li>1. Click sign in in the upper right corner</li>
        <li>
          2. If you don't have account click "Don't have an account? Sign up"
          <div className="screenshot">
            <img src={switchtoSignUp} alt="signup form screen" />
          </div>
        </li>
        <li>
          3. Enter your first name, last name, valid email address, and password
          and confirm your password{" "}
          <div className="screenshot">
            <img src={signupform} alt="signup form screen" />
          </div>
        </li>
        <li>4. Click sign up</li>
      </ol>
    </div>
  );
};

export default Signingup;
