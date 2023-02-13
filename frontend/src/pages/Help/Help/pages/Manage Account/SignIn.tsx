import HelpHeader from "../../components/HelpHeader";
import signinform from "../../../../../assets/help/signinform.png";

const SignIn = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Signing Up" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">Learn how to sign in to your account</p>
      </section>
      <ol>
        <li>1. Click sign in in the upper right corner</li>
        <li>
          2. Enter your email and password
          <div className="screenshot">
            <img src={signinform} alt="signup form screen" />
          </div>
        </li>

        <li>
          4. Click sign <input type="button" value="" />
        </li>
      </ol>
    </div>
  );
};

export default SignIn;
