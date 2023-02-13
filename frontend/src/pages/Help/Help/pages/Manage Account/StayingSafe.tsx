import CollapseItem from "../../components/CollapseItem";
import HelpHeader from "../../components/HelpHeader";
import RelatedTopics from "../../components/RelatedTopics";

const StayingSafe = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Staying Safe" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">
          Learn how to safely share your photos.
        </p>
      </section>
      <CollapseItem
        title="Password Security"
        content={
          <p className="helpTextSecondary">
            Your account password is the first line of defense against
            unauthorized access. Make sure you choose a strong, unique password
            and don't share it with anyone. You should also consider using
            two-factor authentication, which adds an extra layer of security to
            your account.
          </p>
        }
      />
      <CollapseItem
        title="Third-Party Apps "
        content={
          <p className="helpTextSecondary">
            Some third-party apps and websites allow you to link your social
            media accounts and access your photos and data. While this can be
            convenient, it's important to be careful about which apps you use
            and what permissions you give them. Read the app's privacy policy
            and make sure you trust the company before linking your accounts.
          </p>
        }
      />
      <CollapseItem
        title="Device Security "
        content={
          <p className="helpTextSecondary">
            Your smartphone or other device is the gateway to your social media
            accounts, so it's important to keep it secure. Make sure you have a
            passcode or other security features enabled, and keep your device's
            operating system and apps up-to-date. Also, be wary of public Wi-Fi
            networks, as they can be vulnerable to hacking and snooping.
          </p>
        }
      />
      <RelatedTopics
        topics={[
          { text: "Sharing Photos Safely", link: "/help/sharingphotossafely" },
          { text: "Reporting", link: "/help/report" },
        ]}
      />
    </div>
  );
};

export default StayingSafe;
