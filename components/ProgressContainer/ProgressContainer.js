import LinearProgress from "@material-ui/core/LinearProgress";
import cx from "classnames";
import { node, string, bool } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progress: {
    width: "100%",
    position: "absolute",
    top: "4em",
  },
});

const ProgressContainer = ({ className, loading, children, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      {loading && <LinearProgress className={classes.progress} />}
      <main className={cx("container", className)} {...rest}>
        {children}
      </main>
    </>
  );
};

export default ProgressContainer;

ProgressContainer.propTypes = {
  className: string,
  children: node.isRequired,
  loading: bool,
};

ProgressContainer.defaultProps = {
  className: "",
  loading: false,
};
