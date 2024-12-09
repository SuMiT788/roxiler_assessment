import { MoonLoader } from "react-spinners";
import PropTypes from "prop-types";

export default function Loader({
  loading,
  size = 60,
  color = "#007bff",
  speedMultiplier = 1,
}) {
  if (!loading) {
    return null;
  }

  const override = {};

  return (
    <>
      <div className="loader-container">
        <MoonLoader
          color={color}
          size={size}
          speedMultiplier={speedMultiplier}
          cssOverride={override}
        />
      </div>
    </>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  speedMultiplier: PropTypes.number,
};
