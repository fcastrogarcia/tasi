import { shape } from "prop-types";

const DifferentAmount = ({ user }) => {
  return <div />;
};

export default DifferentAmount;

DifferentAmount.propTypes = {
  user: shape({}),
};

DifferentAmount.defaultProps = {
  user: {},
};
