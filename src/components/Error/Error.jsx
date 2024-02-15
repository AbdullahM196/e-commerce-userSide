import PropTypes from "prop-types";
export default function Error({ err }) {
  console.log(err);
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <span>Something went wrong.{err.message ? err.message : err.error}</span>
    </div>
  );
}

Error.propTypes = {
  err: PropTypes.object,
};
