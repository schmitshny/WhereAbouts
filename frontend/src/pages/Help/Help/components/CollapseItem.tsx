import useCollapse from "react-collapsed";
import "./CollapseItem.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CollapseItemProps {
  title: string;
  content: JSX.Element;
}

const CollapseItem: React.FC<CollapseItemProps> = ({ title, content }) => {
  const { getCollapseProps, getToggleProps } = useCollapse();
  return (
    <div className="collapsible">
      <div className="collapsible__header" {...getToggleProps()}>
        <h4>{title}</h4>
        <ArrowDropDownIcon style={{ fontSize: "40px" }} />
      </div>
      <div {...getCollapseProps()}>
        <div className="collapsible__content">{content}</div>
      </div>
    </div>
  );
};

export default CollapseItem;
