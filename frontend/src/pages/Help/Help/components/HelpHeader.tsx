import "./HelpHeader.scss";

const HelpHeader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <header className="YourProfileHeader">
      <h1>{text}</h1>
    </header>
  );
};

export default HelpHeader;
