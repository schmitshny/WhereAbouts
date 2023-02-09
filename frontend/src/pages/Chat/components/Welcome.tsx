import "./Welcome.scss";

const Welcome: React.FC<{ username: string | undefined }> = ({ username }) => {
  return (
    <section className="welcome">
      <h1>
        Welcome <span>{username}</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </section>
  );
};

export default Welcome;
