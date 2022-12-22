import Link from "next/link";
import PropTypes from "prop-types";

function LButton({ to, text }) {
  return (
    <button type="button">
      <Link href={to}>{text}</Link>
    </button>
  );
}
LButton.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};

export default LButton;
