import LinearProgress from "@material-ui/core/LinearProgress";
import cx from "classnames";
import { node, string, bool } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progress: {
    width: "100%",
    position: "absolute",
    top: 0,
  },
});

const ProgressContainer = ({ className, loading, children }) => {
  const classes = useStyles();
  return (
    <div className={cx("container", className)}>
      {loading && <LinearProgress className={classes.progress} />}
      {children}
    </div>
  );
};

export default ProgressContainer;

ProgressContainer.propTypes = {
  className: string,
  children: node.isRequired,
  loading: bool,
};

ProgressContainer.defaultProps = {
  className: {},
  loading: false,
};
