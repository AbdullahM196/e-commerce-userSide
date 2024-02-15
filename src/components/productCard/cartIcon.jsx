import PropTypes from "prop-types";
export default function CartIcon({ inCart, number }) {
  return (
    <>
      <svg
        stroke="currentColor"
        fill={inCart ? "#fff" : "#000"}
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10.5"
          cy="19.5"
          r="1.5"
          fill={inCart ? "#fff" : "#000"}
        ></circle>
        <circle
          cx="17.5"
          cy="19.5"
          r="1.5"
          fill={inCart ? "#fff" : "#000"}
        ></circle>
        {inCart ? (
          <text
            x="10.5"
            y="11"
            fontFamily="Arial"
            fontSize="10"
            fill={inCart ? "#fff" : "#000"}
            fontWeight={700}
          >
            {number}
          </text>
        ) : (
          <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path>
        )}

        <path
          d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"
          fill={inCart ? "#fff" : "#000"}
        ></path>
      </svg>
    </>
  );
}
CartIcon.propTypes = {
  inCart: PropTypes.bool,
  number: PropTypes.number,
};
