import PropTypes from "prop-types";

const btnStyles = {
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px",
  outline: "none",
  border: "2px solid var(--primary)",
  background: "var(--bg)",
  hover: "var(--primary)",
}

function ConfirmPopup({ setRight, func }) {
  return (
    <section
      style={{
        position: "fixed",
        left: "20px",
        bottom: "20px",
        background: "var(--bg)",
        boxShadow: "0 5px 20px 5px rgba(0,0,0,.1)",
        padding: "40px 20px 20px 20px",
        borderRadius: "20px",
        border: "3px solid var(--primary)",
        textAlign: "center",
        zIndex: "200",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
        }}
      >
        本站是否可以使用Cookie？
      </div>
      <p>用来保存您是否开启黑暗模式</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button type="button" onClick={
          () => setRight(false)
        } style={btnStyles}>
          NO!
        </button>
        <button type="button"  style={btnStyles} onClick={() => setRight(true)}>
          OK!
        </button>
      </div>

      <span
        onClick={func}
        style={{
          position: "absolute",
          right: "5px",
          top: "5px",
          cursor: "pointer",
        }}
      >
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.12 14.121A3 3 0 109.879 9.88a3 3 0 004.243 4.242z"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeMiterlimit="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            clipRule="evenodd"
            d="M9.879 9.879s-2.803.009-4.243-1.415c-1.409-1.41-2.864-2.793-1.414-4.242 1.378-1.377 2.81-.015 4.242 1.414C9.87 7.037 9.88 9.879 9.88 9.879zM14.121 9.879s-.009-2.803 1.415-4.243c1.41-1.409 2.793-2.864 4.242-1.414 1.377 1.378.015 2.81-1.414 4.242-1.402 1.406-4.243 1.415-4.243 1.415zM9.879 14.121s.009 2.803-1.415 4.243c-1.41 1.409-2.793 2.864-4.242 1.414-1.377-1.378-.015-2.81 1.414-4.242 1.401-1.406 4.243-1.415 4.243-1.415zM14.121 14.121s2.803-.009 4.243 1.415c1.409 1.41 2.864 2.793 1.414 4.242-1.378 1.377-2.81.015-4.242-1.414-1.406-1.402-1.415-4.243-1.415-4.243z"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeMiterlimit="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </span>
    </section>
  );
}
ConfirmPopup.propTypes = {
  setRight: PropTypes.func.isRequired,
};
export default ConfirmPopup;
