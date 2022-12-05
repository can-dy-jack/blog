import Link from "next/link";
import PropTypes from "prop-types";

function LButton({ to, text }) {
  return (
    <button type="button">
      <Link href={to}>{text}</Link>
    </button>
  );
}
LButton.PropTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default LButton;
