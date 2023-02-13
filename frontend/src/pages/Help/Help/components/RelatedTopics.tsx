import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./RelatedTopics.scss";
import LanguageIcon from "@mui/icons-material/Language";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
interface RelatedTopicProps {
  topics: Array<{
    text: string;
    link: string;
  }>;
}

const RelatedTopics: React.FC<RelatedTopicProps> = ({ topics }) => {
  return (
    <section className="relatedTopics">
      <h2 className="helpPrimaryHeader">Related Topics</h2>
      {topics.map((topic) => {
        return (
          <section className="relatedTopics__topic" key={uuidv4()}>
            <NavLink to={topic.link}>
              <LanguageIcon
                style={{
                  color: "rgba(239,75,120,1)",
                }}
              />
              <p>{topic.text}</p>
              <aside className="arrow">
                <ArrowForwardIosIcon />
              </aside>
            </NavLink>
          </section>
        );
      })}
    </section>
  );
};

export default RelatedTopics;
