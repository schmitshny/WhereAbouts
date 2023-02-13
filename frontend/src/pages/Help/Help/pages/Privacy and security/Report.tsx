import HelpHeader from "../../components/HelpHeader";

import report from "../../../../../assets/help/report.png";
import reportbutton from "../../../../../assets/help/reportbutton.png";
import RelatedTopics from "../../components/RelatedTopics";

const Report = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Reporting" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">
          It's important to maintain a safe and positive environment for all
          users on the platform. If you come across any content that you believe
          violates our content standards, we encourage you to report it
          immediately. This helps us to quickly remove any inappropriate content
          and take appropriate action against the offending user
        </p>
      </section>
      <ol>
        <li>
          1. Click the button on the top right corner
          <div className="screenshot">
            <img src={report} alt="report screen" />
          </div>
        </li>
        <li>
          2. Then click report{" "}
          <div className="screenshot">
            <img src={reportbutton} alt="report screen" />
          </div>
        </li>
      </ol>
      <RelatedTopics
        topics={[
          { text: "Staying Safe", link: "/help/stayingsafe" },
          { text: "Sharing Photos Safely", link: "/help/sharingphotossafely" },
        ]}
      />
    </div>
  );
};

export default Report;
