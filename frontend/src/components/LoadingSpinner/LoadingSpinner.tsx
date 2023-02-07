import { CircularProgress } from "@material-ui/core";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <section className="loading">
      <CircularProgress color="secondary" />
    </section>
  );
};

export default LoadingSpinner;
